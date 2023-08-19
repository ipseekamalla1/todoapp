import React from "react";
import TaskContext from "./TaskContext";
import TaskItem from "../../components/TaskItem";

const TaskState = (props) => {
    const task= [{
        taskName:"Test Note",
        status:"In Progress"
    }];
    const sample="Just try"

  return (
    <TaskContext.Provider value={sample}>
        {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
