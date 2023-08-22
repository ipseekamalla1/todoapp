import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TaskState from "./context/Tasks/TaskState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <TaskState>
      <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home  showAlert={showAlert} />}  />
              <Route path="/login" element={<Login   showAlert={showAlert}/>} />
              <Route path="/signup" element={<SignUp   showAlert={showAlert}/>}  />
            </Routes>
          </div>
        </Router>
      </TaskState>
    </>
  );
}

export default App;
