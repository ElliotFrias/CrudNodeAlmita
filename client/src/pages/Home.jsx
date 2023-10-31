import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GeneralInput from '../components/GeneralInput'
import GeneralButton from '../components/GeneralButton'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
import Edit from '../components/Edit'

function Home() {
  const navigate = useNavigate()
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
    const formattedDate = new Date(dateString).toLocaleString('es-ES', options)
    return formattedDate
  }

  const [action, setAction] = useState({
    task: '',
    priority: '',
    date: '',
    status: '',
  })

  const [tableData, setTableData] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAction((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000')
      const result = res.data
      setTableData(result)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`)
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/formToDo', action)
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <h1>To-Do List</h1>
      <div className="container">
        <div className="tablaDiv">
          <table className="todo-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.task}</td>
                  <td>{todo.priority}</td>
                  <td>{formatDate(todo.date)}</td>
                  <td>{todo.status}</td>
                  <td className="todo-actions">
                    <GeneralButton
                      text="Consultar"
                      onClick={() => {
                        setAction({
                          id: todo.id,
                          task: todo.task,
                          priority: todo.priority,
                          date: todo.date,
                          status: todo.status,
                        })
                        setIsModalOpen(true)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                className="modal-close-button"
                onClick={() => {
                  setIsModalOpen(false)
                  fetchData()
                }}
              >
                X
              </button>
              <Edit data={action} />
            </div>
          </div>
        )}

        <div className="nuevaTareaDiv">
          <h3>Nueva Tarea</h3>
          <form onSubmit={handleSubmit} className="todo-form">
            <h4>Task</h4>
            <GeneralInput
              onChangeHandler={handleChange}
              type="text"
              name="task"
              id="task"
              className="inputTask"
              max={50}
            />

            <h4>Priority</h4>
            <select
              name="priority"
              id="priority"
              value={action.priority}
              onChange={handleChange}
              className="prioritySelect"
            >
              <option value=""></option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>

            <h4>Date</h4>
            <GeneralInput
              onChangeHandler={handleChange}
              type="date"
              name="date"
              id="date"
              value={action.date}
              className="dateInput"
            />

            <h4>Status</h4>
            <select
              name="status"
              id="status"
              value={action.status}
              onChange={handleChange}
              className="satusSelect"
            >
              <option value=""></option>
              <option value="Pendiente">Pendiente</option>
              <option value="Completado">Completado</option>
            </select>

            <GeneralButton type="submit" text="Submit" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Home
