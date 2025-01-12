import { FastifyReply, FastifyRequest } from 'fastify'
import { UserRegisterService } from '../../application/services/user-register.service'
import { PrismaUserRepository } from '../../domain/repositories/prisma/prisma-user.repository'
import { UserSchema } from '../schemas/user-register.schema'

export async function UserRegisterController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = UserSchema.register.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUserRepository()
    const userRegisterService = new UserRegisterService(prismaUserRepository)
    await userRegisterService.execute({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
