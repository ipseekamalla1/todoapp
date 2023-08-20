import React,{useState} from "react";
import TaskContext from "./TaskContext";
import TaskItem from "../../components/TaskItem";

const TaskState = (props) => {
  const host = "http://localhost:8848";
  const tasksInitial = [];
  const [tasks, setTasks] = useState(tasksInitial);
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

  return (
    <TaskContext.Provider value={{tasks,getTasks}}>{props.children}</TaskContext.Provider>
  );
};

export default TaskState;
