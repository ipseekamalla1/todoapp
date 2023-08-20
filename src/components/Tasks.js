import React, { useContext, useEffect } from "react";
import AddTasks from "./AddTasks";
import TaskItem from "./TaskItem";
import TaskContext from "../context/Tasks/TaskContext";

const TaskTable = ({ tasks }) => {
  return (
    <table className="table mb-4">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Todo item</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <TaskItem key={task._id} task={task} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};

const Tasks = () => {
  const context = useContext(TaskContext);
  const { tasks, getTasks } = context;

  useEffect(() => {
    getTasks();
  });

  return (
    <div>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <AddTasks />
                  <div className="container">
                    {tasks.length === 0 && "No Notes to display"}
                  </div>
                  {tasks.length > 0 && <TaskTable tasks={tasks} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
