import React, { useState } from "react";
import TodoCard from "../todo-card/TodoCards";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import "./todo.css"

const show = () => {
    document.getElementById("textarea").style.display = "block";
}



const Todo = () => {

    const [Inputs, setInputs] = useState({
        title: "",
        body: ""
    });

    const [Array, setArray] = useState([])

    const change = (event) => {
        const { name, value } = event.target;
        setInputs({ ...Inputs, [name]: value })
    }



    const submit = () => {

        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Title or body cant be empty");
        } else {
            setArray([...Array, Inputs]);
            setInputs({
                title: "",
                body: ""
            });
            toast.success("Your Task is added");
            toast.error("Your Task is saved ! please SignUp");
        }
    }

    const del = (id) => {
        Array.splice(id, "1");
        setArray([...Array])
    }

    const display = (value) => {
        document.getElementById("todo-update").style.display = value;
    }

    return (
        <>
            <div className="todo">
                <ToastContainer />
                <div className="todo-main container d-flex justify-content-center align-items-center my-3 flex-column">
                    <div className="d-flex flex-column todo-inputs-div w-50 p-1">
                        <input type="text"
                            placeholder="TITLE"
                            className="my-2 p-2 todo-inputs"
                            name="title"
                            onClick={show}
                            value={Inputs.title}
                            onChange={change}
                        />
                        <textarea type="text"
                            id="textarea"
                            placeholder="BODY"
                            name="body"
                            value={Inputs.body}
                            onChange={change}
                            className="mb-2 p-2 todo-inputs" />

                    </div>

                    <div className="w-50 d-flex justify-content-end my-3">
                        <button onClick={submit} className="add-bttn px-2 py-1">Add</button>
                    </div>
                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {
                                Array && Array.map((item, index) => (
                                    <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                                        <TodoCard 
                                        title={item.title} 
                                        body={item.body} id={index} 
                                        delid={del} 
                                        display={display}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-update" id="todo-update">
                <div className="container update">
                    <Update display={display} />
                </div>
            </div>
        </>
    );
}

export default Todo