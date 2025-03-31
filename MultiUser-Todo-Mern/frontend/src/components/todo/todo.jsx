import React from "react";
import "./todo.css"

const Todo = () => {
    return (
        <div className="todo">
            <div className="todo-main container d-flex justify-content-center align-items-center my-3">
                <div className="d-flex flex-column todo-inputs-div w-50">
                    <input type="text"
                     placeholder="TITLE" 
                     className="my-2 p-2 todo-inputs" 
                     />
                    <textarea type="text" 
                    id="textarea"
                    placeholder="BODY" 
                    className="mb-2 p-2 todo-inputs" />
                </div>
            </div>
        </div>
    );
}

export default Todo