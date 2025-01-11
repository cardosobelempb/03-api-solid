import { z } from 'zod'

export namespace UserSchema {
  export const register = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
}
