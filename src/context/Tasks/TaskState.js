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
    // Save the task in setTask
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
    //Add the new task by concatinating
    setTasks(tasks.concat(task));
  };



  //Delete a task
  const deleteTask = async (id) => {
    const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZmE2NGJiZDAyOTNlODNlZjViNGQ3In0sImlhdCI6MTY5MjM3ODcyMX0.0apdwFjQmC9eOsZN-PTI4mj2RBUKB7S-m15r6eKrs2w",

      },
    });
    const json = response.json();
    console.log(json);

     //Remove the task by using it's id usind filter fucntion
    const newTasks = tasks.filter((task) => {
      return task._id !== id;
    });
    setTasks(newTasks);
  };


   //Edit a note
   const editTask = async (id, taskName,status) => {
    //API CALL
    const response = await fetch(`${host}/api/tasks/edittask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZmE2NGJiZDAyOTNlODNlZjViNGQ3In0sImlhdCI6MTY5MjM3ODcyMX0.0apdwFjQmC9eOsZN-PTI4mj2RBUKB7S-m15r6eKrs2w",
      },

      body: JSON.stringify({ taskName,status }),
    });
    const json = response.json();
    console.log(json);

    let newTasks = JSON.parse(JSON.stringify(tasks));
    //Logic to edit the client
    for (let index = 0; index < tasks.length; index++) {
      const element = newTasks[index];

      // If the id that is fetched id equal to the id on loop then replace it
      if (element._id === id) {
        newTasks[index].taskName = taskName;
        newTasks[index].status = status;
        break;
      }
    }
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{tasks, getTasks, addTask,deleteTask,editTask}}>{props.children}</TaskContext.Provider>
  );
};

export default TaskState;
