import React from 'react'

const Sample = () => {
  return (
    <div>
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
  )
}

export default Sample
