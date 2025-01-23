import { FindByEmailError } from '@/core/application/errors/findby-email.error'
import { userRegisterMake } from '@/modules/user/application/services/user-register/user-register.make'
import { FastifyReply, FastifyRequest } from 'fastify'

import { UserSchema } from '../../schemas/user.schema'

export async function userRegisterController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = UserSchema.register.parse(request.body)
  try {
    const userRegisterService = userRegisterMake()

    await userRegisterService.execute({
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
