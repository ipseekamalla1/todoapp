import React from 'react'

const Sample = () => {
  return (
    <div>
      <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Hello</td>
            <td>hELLO</td>
            <td>
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
              <button type="submit" className="btn btn-secondary ms-1">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
    </div>
  )
}

export default Sample
