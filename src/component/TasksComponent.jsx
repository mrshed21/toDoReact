import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

//toast
import { toast } from "react-toastify";

export const TasksComponent = ({
  tasks,
  setTasks,
  setInputBtn,
  setNewTask,
  setExitingTaskId,
}) => {
  // --------------------- edit task
  function editTask(task) {
    setExitingTaskId(task.id);

    setInputBtn("Edit");
    let editTaskInInput = tasks.filter((e) => e.name === task.name);
    setNewTask(editTaskInInput[0].name);
  }
  // ------------------- delete task
  function deleteTask(index) {
    setExitingTaskId(index);
    const updatedTasks = tasks.filter((e) => e.id !== index);

    setTasks(updatedTasks);
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
    toast.error("تم حذف المهمة 🗑️");
    
    setInputBtn("Add");
    setNewTask("");
  }

  //------------------- move task upp
  function moveTaskUpp(task) {
    if (tasks.length <= 1) return;

    const index = tasks.findIndex((t) => t === task);
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
    }
    setInputBtn("Add");
    setNewTask("");
  }
  //------------------- move task down
  function moveTaskDown(task) {
    if (tasks.length <= 1) return;

    const index = tasks.findIndex((t) => t === task);
    if (index === -1 || index === tasks.length - 1) return;

    const updated = [...tasks];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setTasks(updated);
    setInputBtn("Add");
    setNewTask("");
    localStorage.setItem("localTasks", JSON.stringify(updated));
  }

  return (
    <>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>
            <span className="text"> {task.name}</span>
            <button className="move-button" onClick={() => editTask(task)}>
              edit
            </button>
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              delete
            </button>

            <button className="move-button" onClick={() => moveTaskUpp(task)}>
              <KeyboardDoubleArrowUpIcon />
            </button>
            <button className="move-button" onClick={() => moveTaskDown(task)}>
              <KeyboardDoubleArrowDownIcon />
            </button>
          </li>
        ))}
      </ol>
    </>
  );
};
