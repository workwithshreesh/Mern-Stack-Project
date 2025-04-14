import React, { useState, useEffect } from "react";
import TodoCard from "../todo-card/TodoCards";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import axios from "../../Utils/axiosInterseptor";
import "./todo.css";

const show = () => {
  document.getElementById("textarea").style.display = "block";
};

const Todo = () => {
  const parsedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = parsedUser?._id;
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    if (!inputs.title || !inputs.body) {
      toast.error("Title or body can't be empty");
      return;
    }

    const newTask = { title: inputs.title, body: inputs.body };

    if (parsedUser) {
      try {
        const response = await axios.post("/v2/addTask", { ...newTask, id: userId });
        setTasks([...tasks, response.data.list]); // Assuming server returns the saved task
        toast.success("Task added successfully!");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error adding task");
        return;
      }
    } else {
      const guestTasks = [...tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(guestTasks));
      setTasks(guestTasks);
      toast.success("Task saved locally! Please Sign In to sync.");
    }

    setInputs({ title: "", body: "" });
  };

  const del = async (id) => {
    if (typeof id === "number") {
      const updated = [...tasks];
      updated.splice(id, 1);
      setTasks(updated);
      if (!parsedUser) localStorage.setItem("tasks", JSON.stringify(updated));
    } else {
      try {
        await axios.delete(`/v2/deleteTask/${id}`);
        setTasks((prev) => prev.filter((task) => task._id !== id));
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const display = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  useEffect(() => {
    const loadTasks = async () => {
      if (parsedUser) {
        const saved = localStorage.getItem("tasks");
        console.log("saved",saved)
        if (saved) setTasks(JSON.parse(saved));
      } else {
        try {
            console.log(userId)
          const res = await axios.get(`/v2/GetTask/${userId}`);
          setTasks(res.data.list); // assuming your API returns tasks in `data.tasks`
        } catch (err) {
          toast.error(err?.response?.data?.message || "Failed to fetch tasks");
        }
      }
    };

    loadTasks();
  }, [userId]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-3 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              name="title"
              onClick={show}
              value={inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              placeholder="BODY"
              name="body"
              value={inputs.body}
              onChange={change}
              className="mb-2 p-2 todo-inputs"
            />
          </div>

          <div className="w-50 d-flex justify-content-end my-3">
            <button onClick={submit} className="add-bttn px-2 py-1">Add</button>
          </div>
        </div>

        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {tasks.map((item, index) => (
                <div className="col-lg-3 col-10 mx-5 my-2" key={item._id || index}>
                  <TodoCard
                    title={item.title}
                    body={item.body}
                    id={item._id || index}
                    delid={del}
                    display={display}
                  />
                </div>
              ))}
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
};

export default Todo;
