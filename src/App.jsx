import ToDoList from "./component/ToDoList";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToDoList />
      <ToastContainer position="bottom-left" autoClose={3000} />
    </>
  );
}

export default App;
