import React, { useState } from "react";
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
        setInputs({ ...Inputs, [name]: value}) 
    }

    const submit = () => {

        setArray( ...Array , Inputs );
        
        setInputs({
            title: "",
            body: ""
        });

    }

    return (
        <div className="todo">
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
        </div>
    );
}

export default Todo