import React, { useContext, useState } from "react";
import TaskContext from "../context/Tasks/TaskContext";

const AddTasks = () => {
  const context = useContext(TaskContext);
  const { addTask } = context;
  const [task, setTask] = useState({ taskName: " ", status: " " });

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    addTask(task.taskName, task.status);
  };

  return (
    <div>
      <form className="row g-3 align-items-center mb-4 pb-2">
        <div className="col-lg-4">
          <div className="form-outline">
            <input
              type="text"
              id="task"
              name="taskName"
              className="form-control my-2"
              placeholder="Enter you task"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-lg-3">
          <select
            className="form-select"
            aria-label="Status"
            value={task.status}
            onChange={onChange}
            name="status"
          >
            <option value="To do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="col-lg-2">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleAddClick}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTasks;
