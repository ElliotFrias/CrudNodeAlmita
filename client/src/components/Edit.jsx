import React, { useState } from 'react'
import axios from 'axios'

function Edit({ data }) {
  const [editedData, setEditedData] = useState(data)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedData({
      ...editedData,
      [name]: value,
    })
  }

  const handleSave = async () => {
    const { task, priority, date, status } = editedData

    await fetch(`http://localhost:3000/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task,
        priority,
        date,
        status,
      }),
    })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <h3>Task</h3>
      <input
        type="text"
        name="task"
        value={editedData.task}
        onChange={handleInputChange}
      />

      <h3>Priority</h3>
      <select
        className="prioritySelect"
        name="priority"
        value={editedData.priority}
        onChange={handleInputChange}
      >
        <option value=""></option>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>

      <h3>Date</h3>
      <input
        type="date"
        name="date"
        value={editedData.date}
        onChange={handleInputChange}
      />

      <h3>Status</h3>
      <select
        name="status"
        value={editedData.status}
        onChange={handleInputChange}
        className="statusSelect"
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Completado">Completado</option>
      </select>
      <button onClick={() => handleSave()}>Guardar</button>
      <button onClick={() => handleDelete(data.id)} className='deleteBtn'>Eliminar</button>
    </div>
  )
}

export default Edit
