import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import {
  createController,
  readController,
  deleteController,
} from './controller/toDo.js'
import bodyParser from 'body-parser'
import router from './routes/user.routes.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(corsMiddleware())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
