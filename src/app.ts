import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './core/lib/prisma'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const userCreateSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = userCreateSchema.parse(request.body)

  await prisma.user.create({
    data: { name, email, password_hash: password },
  })

  return reply.status(201).send()
})
