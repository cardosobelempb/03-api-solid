import { z } from 'zod'

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

// export const UserCreateSchema = infer<typeof userCreateSchema>
