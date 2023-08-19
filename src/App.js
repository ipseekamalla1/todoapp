import "./App.css";

import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TaskState from "./context/Tasks/TaskState";

function App() {
  return (
    <>
      <TaskState>
        <Navbar />
        <Home />
      </TaskState>
    </>
  );
}

export default App;
