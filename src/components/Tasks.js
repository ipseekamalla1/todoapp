import React, { useContext, useEffect, useState, useRef } from "react";
import AddTasks from "./AddTasks";
import TaskItem from "./TaskItem";
import TaskContext from "../context/Tasks/TaskContext";

const TaskTable = ({ tasks, updateTask }) => {
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
          <TaskItem key={index} task={task} index={index + 1} updateTask={updateTask} />
        ))}
      </tbody>
    </table>
  );
};

const Tasks = () => {
  const context = useContext(TaskContext);
  const { tasks, getTasks, editTask } = context;
  const [task, setTask] = useState({ id: "", etaskName: "", estatus: "" });

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const ref = useRef(null);
  const refClose = useRef(null);

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    console.log("Editing success", task);
    editTask(task.id, task.etaskName, task.estatus);
    refClose.current.click();
  };


  const updateTask = (currentTask) => {
    ref.current.click();
    setTask({
      id: currentTask._id,
      etaskName: currentTask.taskName,
      estatus: currentTask.status,
    });
  };

  return (
    <div>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <AddTasks />
                  <button
                    ref={ref}
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Launch demo modal
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Edit Task
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="form-group my-3">
                            <label htmlFor="taskName">Task:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="etaskName"
                              name="etaskName"
                              aria-describedby="emailHelp"
                              placeholder="Enter your task"
                              onChange={onChange}
                              value={task.taskName}
                            />
                          </div>

                          <div className="form-group my-3">
                            <label htmlFor="status">Status</label>
                            <select
                              className="form-select"
                              aria-label="Status"
                              value={task.status}
                              onChange={onChange}
                              name="estatus"
                              id="estatus"
                            >
                              <option value="To Do">To Do</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            ref={refClose}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddClick}
                          >
                            Update Task
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    {tasks.length === 0 && "No Notes to display"}
                  </div>
                  {tasks.length > 0 && <TaskTable tasks={tasks} updateTask={updateTask} />}
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
