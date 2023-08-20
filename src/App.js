import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TaskState from "./context/Tasks/TaskState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <TaskState>
      <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />}  />
            </Routes>
          </div>
        </Router>
      </TaskState>
    </>
  );
}

export default App;
