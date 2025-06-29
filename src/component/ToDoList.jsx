/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';

import "./todolist.css";
import { TasksComponent } from "./TasksComponent";

//toast
import { toast } from "react-toastify";

// TO DO:
// --------------------------------
// uniqID -------------------------------
// component splitting ----------------------
// editing task ---------------------
// localStorage -------------------------
// dont repet tasks -------------------
// animation
// message add/delete --------------------
// ---------------------------------

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [inputBtn, setInputBtn] = useState("Add");
  const [exitingTaskId, setExitingTaskId] = useState(null);

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  const taskInfo = (
    <h2 className="task-info">
      You have <span> {tasks.length} </span> task/s{" "}
      <button className="delete-button" onClick={deleteTask}>
        Delete All
      </button>{" "}
    </h2>
  );

  // ------------------- delete all tasks
  function deleteTask() {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف جميع المهام؟");
    if (confirmDelete) {
      setTimeout(() => {
        setTasks([]);
        localStorage.removeItem("localTasks");
        toast.error("تم حذف جميع المهام 🗑️");
      }, 300);
      setInputBtn("Add");
      setNewTask("");
    }
  }

  // ------------------- edit task
  function saveEdit(taskId) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newTask } : task
    );
    setTasks(updatedTasks);
    setInputBtn("Add");

    setNewTask("");
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
    toast.success("تم تعديل المهمة ✏️");
  }

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem("localTasks")) || [];
    setTasks(localTasks);
  }, []);

  //------------------- add New Task
  function addTask() {
    if (newTask.trim() !== "") {
      if (inputBtn === "Add") {
        if (tasks.some((task) => task.name === newTask.trim())) {
          toast.error("this task was already added");

          
          setNewTask("");
          return;
        } else {
          const addedTask = {
            id: nanoid(),
            name: newTask.trim(),
          };
          const addedToLocal = [...tasks, addedTask];
          setTasks(addedToLocal);
          toast.success("task added succesfuly ✅");

          localStorage.setItem("localTasks", JSON.stringify(addedToLocal));
          setNewTask("");
        }
      } else if (inputBtn === "Edit") {
        saveEdit(exitingTaskId);
      }
    }
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }
  return (
    <div className="to-do-list">
      <h1>To Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Add"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className="add-button" onClick={addTask}>
          {inputBtn}
        </button>
      </div>
      <TasksComponent
        tasks={tasks}
        setTasks={setTasks}
        setNewTask={setNewTask}
        setInputBtn={setInputBtn}
        setExitingTaskId={setExitingTaskId}
      />
      {tasks.length > 0 && taskInfo}
    </div>
  );
}

export default ToDoList;
