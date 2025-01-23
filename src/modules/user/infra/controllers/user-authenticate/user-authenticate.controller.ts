import { InvalidCredentialsError } from '@/core/application/errors/invalid-credentials.erro'
import { userAuthenticateMake } from '@/modules/user/application/services/user-authenticate/user-authenticate.make'
import { FastifyReply, FastifyRequest } from 'fastify'

import { UserSchema } from '../../schemas/user.schema'

export async function userAuthenticateController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { email, password } = UserSchema.authenticate.parse(request.body)
  try {
    const userAuthenticateService = userAuthenticateMake()
    const { user } = await userAuthenticateService.execute({
      email,
      password,
    })
    const access_token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
    return response.status(200).send({ access_token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(400).send({ message: error.message })
    }
    throw error
  }
}
