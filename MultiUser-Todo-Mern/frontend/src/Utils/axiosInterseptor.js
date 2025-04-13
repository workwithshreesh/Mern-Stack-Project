import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8000/api", // common api prefix
});


// Add request interceptor

instance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// Optional: Add response interceptor to handle global errors
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401){
            alert("Session expired. Please login again.");
            // Optionally remove token or redirect to login
            sessionStorage.clear();
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
);

export default instance;