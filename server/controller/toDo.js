import { create, read, deletee, update } from '../model/toDo.js'
import { validateToDo } from '../schemas/toDo.js'

const createController = async (req, res) => {
  const result = validateToDo(req.body)
  try {
    if (
      result.data.priority == '' ||
      result.data.date == '' ||
      result.data.status == '' ||
      (result.data.priority != 'Alta' &&
        result.data.priority != 'Media' &&
        result.data.priority != 'Baja') ||
      (result.data.status != 'Pendiente' && result.data.status != 'Completado')
    ) {
      return res.status(400).json({ error: 'No valido' })
    }
  } catch (err) {
    return res.status(400).json({ error: 'No valido' })
  }
  console.log(result)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newToDO = await create({ input: result.data })

  res.status(201).json(newToDO)
}

const readController = async (req, res) => {
  try {
    const [toDos] = await read()
    res.json(toDos)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const deleteController = async (req, res) => {
  try {
    await deletee(req.params.id)
  } catch (err) {
    console.log(err.message)
  }

  res.status(201)
}

const updateController = async (req, res) => {
  const result = validateToDo(req.body)
  try {
    await update(req.params.id, result)
  } catch (err) {
    console.log(err.message)
  }

  res.status(201)
}

export { createController, readController, deleteController, updateController }
