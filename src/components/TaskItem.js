import React, { useContext } from "react";
import TaskContext from "../context/Tasks/TaskContext";

const TaskItem = ({ task, index, updateTask }) => {
  const context = useContext(TaskContext);
  const { deleteTask } = context;

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{task.taskName}</td>
      <td>{task.status}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            deleteTask(task._id);
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-1"
          onClick={() => {
            updateTask(task);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
