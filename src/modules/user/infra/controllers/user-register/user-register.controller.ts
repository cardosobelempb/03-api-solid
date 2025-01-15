import { FindByEmailError } from '@/core/application/errors/findby-email.error'
import { UserRegisterService } from '@/modules/user/application/services/user-register/user-register.service'
import { UserPrismaRepository } from '@/modules/user/domain/repositories/prisma/user-prisma.repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserSchema } from '../../schemas/user.schema'

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
    throw error
  }

  return reply.status(201).send()
}
