import z from 'zod'

const toDoSchema = z.object({
  task: z.string().min(2).max(50),
  priority: z.string().min(2).max(20),
  date: z.string().min(2).max(30),
  status: z.string().min(2).max(10),
})

export function validateToDo(input) {
  return toDoSchema.safeParse(input)
}
