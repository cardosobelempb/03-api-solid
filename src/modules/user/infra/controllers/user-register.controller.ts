import { FastifyReply, FastifyRequest } from 'fastify'
import { userCreateSchema } from '../requests/user-register.request'
import { prisma } from '@/core/lib/prisma'

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = userCreateSchema.parse(request.body)

  await prisma.user.create({
    data: { name, email, password_hash: password },
  })

  return reply.status(201).send()
}
