import React, { useState, useEffect } from "react";
import TodoCard from "../todo-card/TodoCards";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import axios from "../../Utils/axiosInterseptor";
import "./todo.css";

const show = () => {
  document.getElementById("textarea").style.display = "block";
};

// global variable for patch data in modal
let toUpdateArray = [];

const Todo = () => {


  const parsedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = parsedUser?._id;
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]);

  const [taskToUpdate, setTaskToUpdate] = useState(null);


  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };


  // Submit new data
  const submit = async () => {
    if (!inputs.title || !inputs.body) {
      notify(1, "Title or body can't be empty", 1);
      return;
    }

    const newTask = { title: inputs.title, body: inputs.body };

    if (parsedUser) {
      try {
        const response = await axios.post("/v2/addTask", { ...newTask, id: userId });
        setTasks([...tasks, response.data.list]); // Assuming server returns the saved task
        notify(1, "Task added successfully!", 0);
      } catch (error) {
        notify(1, "Error adding task", 1);
        return;
      }
    } else {
      const guestTasks = [...tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(guestTasks));
      setTasks(guestTasks);
      notify(1, "Task saved locally! Please Sign In to sync.", 0);
    }

    setInputs({ title: "", body: "" });
  };

  const del = async (id) => {

    try {
      if (typeof id === "number") {
        const updated = [...tasks];
        updated.splice(id, 1);
        setTasks(updated);
        if (!parsedUser) localStorage.setItem("tasks", JSON.stringify(updated));
        notify(1, "Local task deleted successfully", 0);
      } else {
        await axios.delete(`/v2/deleteTask/${id}`, {
          data: { id: userId }
        });
        setTasks((prev) => prev.filter((task) => task._id !== id));
        notify(1, "Task deleted successfully", 0);
      }
    } catch (error) {
      notify(1, "Something went wrong", 1);
    }
  };


  const display = (value) => {
    document.getElementById("todo-update").style.display = value;
  };


  const update = (id) => {
    try {
      const task = tasks.find(task => task._id === id);
      if (task) {
        setTaskToUpdate(task);      
        display("block");           
      } else {
        notify("Task not found", "error");
      }
    } catch (error) {
      notify("Something went wrong", "error");
    }
  };




  useEffect(() => {
    const loadTasks = async () => {
      const saved = localStorage.getItem("tasks");

      // If user is logged in AND localStorage has guest tasks
      if (parsedUser && saved) {
        const guestTasks = JSON.parse(saved);

        try {

          guestTasks.forEach(async (task) => {
            await axios.post("/v2/addTask", { ...task, id: userId });
          })

          // Clear guest tasks after syncing
          localStorage.removeItem("tasks");
        } catch (error) {
          notify(1, "Failed to sync local tasks", 1);
        }
      }

      // Now fetch all tasks from server or localStorage
      if (!parsedUser) {
        if (saved) setTasks(JSON.parse(saved));
      } else {
        try {
          const res = await axios.get(`/v2/GetTask/${userId}`);
          setTasks(res.data.list);
        } catch (err) {
          notify(1, "Failed to fetch tasks", 1);
        }
      }
    };

    loadTasks();
  }, [userId]);



  const handleTaskUpdate = async (updatedTask) => {
    try {
      const res = await axios.put(`/v2/updateTask/${updatedTask._id}`, {
        ...updatedTask,
        id: userId,
      });

      console.log("update",res)

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      
      notify(1, "Task updated successfully!", 0);
    } catch (error) {
      notify(1, "Failed to update task", 1);
    }
  };



  const notify = (toastFlag, toastName, errorToast) => {
    if (toastFlag === 1 && errorToast === 0) {
      toast.success(`${toastName}`);
      toastFlag = 0;
    }
    else if (toastFlag && errorToast === 1) {
      toast.error(`${toastName}`);
      toastFlag = 0;
    }
  }

  return (
    <>
      <div className="todo vh-100 ">
        <ToastContainer />
        <div className="todo-main  d-flex justify-content-center align-items-center my-5 flex-column">
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
              {tasks.filter((item) => item && item.title && item.body)
                .map((item, index) => (
                  <div className="col-lg-3 col-10 mx-5 my-2" key={item._id || index}>

                    <TodoCard
                      title={item.title}
                      body={item.body}
                      id={item._id || index}
                      delid={del}
                      display={display}
                      updateId={item._id || index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="todo-update" id="todo-update">
        <div className="update">
          <Update
            display={display}
            update={taskToUpdate}
            onSubmit={handleTaskUpdate}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
