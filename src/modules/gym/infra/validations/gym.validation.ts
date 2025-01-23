import { z } from 'zod'

export namespace GymValidation {
  export const create = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  export const update = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
}
