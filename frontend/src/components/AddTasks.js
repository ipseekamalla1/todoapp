import React, { useContext, useState } from "react";
import TaskContext from "../context/Tasks/TaskContext";

const AddTasks = (props) => {
  const context = useContext(TaskContext);
  const { addTask } = context;
  const [task, setTask] = useState({ taskName: "", status: "" });
  const [isFormValid, setIsFormValid] = useState(true);

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (task.taskName.trim() === "" || task.taskName.length < 3) {
      setIsFormValid(false);
      return; // Exit the function if taskName is blank or too short
    }
    addTask(task.taskName, task.status);
    props.showAlert("Task Added Successfully", "success");
    setTask({ taskName: "", status: "To Do" });
    setIsFormValid(true); // Reset form validation status
  };

  return (
    <div>
      <form
        className="row g-3 align-items-center mb-4 pb-2 needs-validation"
        noValidate
      >
        <div className="col-lg-4">
          <div className="form-outline">
            <input
              type="text"
              id="task"
              name="taskName"
              className={`form-control my-2 ${
                isFormValid ? "" : "is-invalid"
              }`}
              placeholder="Enter your task"
              onChange={onChange}
              value={task.taskName}
              required
            />
            {!isFormValid && (
              <div className="invalid-feedback">
                {task.taskName.trim() === ""
                  ? "Task Name cannot be blank"
                  : "Task Name must be at least 3 characters long"}
              </div>
            )}
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
            <option value="To Do">To Do</option>
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
