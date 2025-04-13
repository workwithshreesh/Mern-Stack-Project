import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store";
import "./signin.css";

const SignIn = () => {

    const dipatch = useDispatch()

    const navigate = useNavigate();

    const [Input, setInput] = useState({
        email: "",
        password: ""
    });

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value });
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/v1/signin", Input);
            const {token, others} = response.data
            // save data in session storage
            sessionStorage.setItem("user",JSON.stringify(others));
            sessionStorage.setItem("token",token)

            // Use reducer dispatch and login
            dipatch(authActions.login({others, token}))
            setInput({ email: "", password: "" });
            alert(response.data.message);
            navigate("/");
    
        } catch (error) {
            // suppress error in console
            if (error.response && error.response.status === 401) {
                // expected error, don't log
                alert("Invalid email or password");
            } else {
                // unexpected error, log it
                console.error("Something went wrong:", error);
                alert("Something went wrong. Please try again later.");
            }
        }
    };
    

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column w-100 p-5">
                            <input
                                className="p-2 my-3 input-signup"
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                onChange={change}
                                value={Input.email}
                            />

                            <input
                                className="p-2 my-3 input-signup"
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                onChange={change}
                                value={Input.password}
                            />

                            <button className="btn-signup p-2" onClick={submit}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default SignIn;