import { z } from 'zod'

export namespace CheckInValidation {
  export const create = z.object({
    userLatitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  export const history = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  export const id = z.object({
    checkInId: z.string().uuid(),
  })

  export const update = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
}
