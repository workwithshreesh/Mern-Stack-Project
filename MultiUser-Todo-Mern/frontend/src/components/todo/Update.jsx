import React,{useEffect, useState} from "react";

const Update = ({ display, update, onSubmit }) => {

    const [Inputs, setInputs] = useState({
        title:"",
        body:""
    });

    useEffect( () => {
        if (update){
            setInputs({
                title: update.title || "",
                body: update.body || ""
              });          
        }
    },[update]);

    const change = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
      };
      


    const handleUpdate = () => {
        if (!Inputs.title || !Inputs.body) return;

        const updatedTask = {
            ...update,
            title: Inputs.title,
            body: Inputs.body,
        }
        onSubmit(updatedTask);
        display("none");

    }
    
    return (
        <div className="mt-5 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "600px", borderRadius: "10px" }}>
                <div className="card-body">
                    <h4 className="card-title mb-4 text-center">✏️ Update Your Task</h4>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="taskTitle" className="form-label">Title</label>
                        <input
                            type="text"
                            id="taskTitle"
                            className="form-control"
                            placeholder="Enter updated task title"
                            name="title"
                            value={Inputs.title}
                            onChange={change}
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="taskDesc" className="form-label">Description</label>
                        <textarea
                            id="taskDesc"
                            className="form-control"
                            rows="4"
                            placeholder="Enter updated task description"
                            name="body"
                            value={Inputs.body}
                            onChange={change}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={() => display("none")}>Close</button>
                        <button className="btn btn-primary" onClick={handleUpdate}>Update Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
