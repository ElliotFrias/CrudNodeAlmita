import { Router } from 'express'
import {
  createController,
  readController,
  deleteController,
  updateController,
} from '../controller/toDo.js'

const router = Router()

router.post('/formToDo', createController)

router.get('/', readController)

router.delete('/:id', deleteController)

router.put('/:id', updateController)

export default router
