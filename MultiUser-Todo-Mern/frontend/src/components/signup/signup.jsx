import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {

    // navigate
    const navigate = useNavigate();

    const [Input, setInput] = useState({
        email:"",
        username:"",
        password:""
    });

    const change = (e) => {
        const {name, value} = e.target;
        setInput({...Input, [name]: value});
    }

    const submit = async (e) => {
        e.preventDefault();
        await axios.post(
            "http://localhost:8000/api/v1/register",
            Input
        ).then((response)=>{
            alert(response.data.message)
            setInput({
                email:"",
                username:"",
                password:""
            });

            // Navigate to signin
            navigate("/signin");
            
        }).catch((error)=> {
            alert(error.data.message)
        });
    
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column w-100 p-5">
                        <h3 className="text-color">Sign Up</h3>
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
                                type="username"
                                name="username"
                                placeholder="Enter Your Username"
                                onChange={change}
                                value={Input.username}
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

export default SignUp;
