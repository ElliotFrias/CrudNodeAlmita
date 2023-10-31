import mysql from 'mysql2/promise'

const connectionString = {
  host: 'localhost',
  user: 'root',
  database: 'ToDoDB',
  password: 'ElliotF1001',
  port: 3306,
}

const conn = await mysql.createConnection(connectionString)

conn.connect((err) => {
  if (err) {
    console.log('No ha sido posible conectar con la bd')
  }
})

const create = async ({ input }) => {
  const { task, priority, date, status } = input
  let [newTodo] = []
  try {
    await conn.query(
      `INSERT INTO ToDos (task, date, priority, status) VALUES (?, ?, ?, ?);`,
      [task, date, priority, status]
    )

    newTodo = await conn.query(
      `SELECT * FROM ToDos WHERE id = LAST_INSERT_ID();`
    )
  } catch (err) {
    console.log(err.message)
  }

  return newTodo
}

const read = async () => {
  try {
    const toDos = await conn.query(`SELECT * FROM ToDos;`)
    return toDos
  } catch (err) {
    console.log(err.message)
  }
}

const deletee = async (id) => {
  try {
    await conn.query(`DELETE FROM ToDos WHERE id = ?;`, [id])
  } catch (err) {
    console.log(err.message)
  }
}

const update = async (id, input) => {
  function formatearFecha(fechaOriginal) {
    const fecha = new Date(fechaOriginal)
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const dia = String(fecha.getDate()).padStart(2, '0')

    return `${año}-${mes}-${dia}`
  }

  const fechaFormateada = formatearFecha(input.data.date)

  try {
    await conn.query(
      `UPDATE ToDos SET task = ?, date = ?, priority = ?, status = ? WHERE id = ?;`,
      [
        input.data.task,
        fechaFormateada,
        input.data.priority,
        input.data.status,
        id,
      ]
    )
  } catch (err) {
    console.log(err.message)
  }
}

export { create, read, deletee, update }
