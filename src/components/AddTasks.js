import React from "react";

const AddTasks = () => {
  return (
    <div>
      <form className="row g-3 align-items-center mb-4 pb-2">
        <div className="col-lg-4">
          <div className="form-outline">
            <input type="text" id="form1" className="form-control my-2"  placeholder="Enter you task"/>
  
          </div>
        </div>
        <div className="col-lg-3">
          <select className="form-select" aria-label="Default select example" placeholder="Status">
            <option defaultValue>To do</option>
            <option value="1">In Progress</option>
            <option value="2">Completed</option>
          </select>
        </div>
        <div className="col-lg-2">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTasks;
