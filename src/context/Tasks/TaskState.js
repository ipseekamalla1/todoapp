import React,{useState} from "react";
import TaskContext from "./TaskContext";


const TaskState = (props) => {
  const host = "http://localhost:8848";
  const tasksInitial = [];
  const [tasks, setTasks] = useState(tasksInitial);

  //Get all the tasks
  const getTasks = async () => {
    //API Call
    const response = await fetch(`${host}/api/tasks/displaytasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZmE2NGJiZDAyOTNlODNlZjViNGQ3In0sImlhdCI6MTY5MjM3ODcyMX0.0apdwFjQmC9eOsZN-PTI4mj2RBUKB7S-m15r6eKrs2w"
      },
    });
    const json = await response.json();
    setTasks(json);
  };
  //Add a task

  const addTask = async (taskName,status) => {
    //API Call
    const response = await fetch(`${host}/api/tasks/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZmE2NGJiZDAyOTNlODNlZjViNGQ3In0sImlhdCI6MTY5MjM3ODcyMX0.0apdwFjQmC9eOsZN-PTI4mj2RBUKB7S-m15r6eKrs2w",
      },
      body: JSON.stringify({ taskName,status }),
    });
    const task = await response.json();
    console.log(task)
    setTasks(tasks.concat(task));
  };

  return (
    <TaskContext.Provider value={{tasks, getTasks, addTask}}>{props.children}</TaskContext.Provider>
  );
};

export default TaskState;
