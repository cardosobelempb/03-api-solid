import { InvalidCredentialsError } from '@/core/application/errors/invalid-credentials.erro'
import { userAuthenticateMake } from '@/modules/user/application/services/user-authenticate/user-authenticate.make'
import { FastifyReply, FastifyRequest } from 'fastify'

import { UserSchema } from '../../schemas/user.schema'

export async function userAuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = UserSchema.authenticate.parse(request.body)
  try {
    const userAuthenticateService = userAuthenticateMake()
    await userAuthenticateService.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
