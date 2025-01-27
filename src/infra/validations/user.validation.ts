import { z } from 'zod'

export namespace UserValidation {
  export const register = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  export const id = z.object({
    userId: z.string().uuid(),
  })

  export const authenticate = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
}
