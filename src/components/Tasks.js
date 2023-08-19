import React from "react";
import AddTasks from "./AddTasks";
import TaskItem from "./TaskItem";

const Tasks = () => {
  return (
    <div>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <AddTasks />
                  <TaskItem />
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
