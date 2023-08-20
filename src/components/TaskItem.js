import React from "react";


const TaskItem = ({ task, index }) => {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{task.taskName}</td>
      <td>{task.status}</td>
      <td>
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
        <button type="submit" className="btn btn-secondary ms-1">
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
