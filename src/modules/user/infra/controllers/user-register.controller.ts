import { FastifyReply, FastifyRequest } from 'fastify'
import { UserRegisterService } from '../../application/services/user-register.service'
import { UserPrismaRepository } from '../../domain/repositories/prisma/user-prisma.repository'
import { UserSchema } from '../schemas/user-register.schema'

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = UserSchema.register.parse(request.body)
  try {
    const userRepsitory = new UserPrismaRepository()
    const userRegister = new UserRegisterService(userRepsitory)
    await userRegister.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
