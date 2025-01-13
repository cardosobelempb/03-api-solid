import { FastifyReply, FastifyRequest } from 'fastify'
import { UserRegisterService } from '../../application/services/user-register.service'
import { UserPrismaRepository } from '../../domain/repositories/prisma/user-prisma.repository'
import { UserSchema } from '../schemas/user-register.schema'
import { FindByEmailError } from '@/core/application/errors/findby-email.error'

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
    if (error instanceof FindByEmailError) {
      return reply.status(409).send({ message: error.message })
    }
    return error
  }

  return reply.status(201).send()
}
