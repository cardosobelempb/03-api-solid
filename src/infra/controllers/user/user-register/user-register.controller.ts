import { userRegisterMake } from '@/application/services/user/user-register/user-register.make'
import { FindByEmailError } from '@/core/application/errors/findby-email.error'
import { UserValidation } from '@/infra/validations/user.validation'

import { FastifyReply, FastifyRequest } from 'fastify'

export async function userRegisterController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = UserValidation.register.parse(request.body)
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
