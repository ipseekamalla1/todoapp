import React from 'react'

const AddTasks = () => {
  return (
    <div>
       <form className="row row-cols-lg-auto g-3 align-items-center mb-4 pb-2">
                    <div className="col-lg-6">
                      <div className="form-outline">
                        <input type="text" id="form1" className="form-control my-2" />
                        <label className="form-label" htmlFor="form1">
                          Enter your task
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-6 d-flex justify-content-lg-end align-items-center">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
    </div>
  )
}

export default AddTasks
