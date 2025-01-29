import { userAuthenticateMake } from '@/application/services/user/user-authenticate/user-authenticate.make'
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials.erro'
import { UserValidation } from '@/infra/validations/user.validation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function userAuthenticateController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { email, password } = UserValidation.authenticate.parse(request.body)
  try {
    const userAuthenticateService = userAuthenticateMake()
    const { user } = await userAuthenticateService.execute({
      email,
      password,
    })
    const access_token = await response.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refresh_token = await response.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return response
      .setCookie('refresh_token', refresh_token, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ access_token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(400).send({ message: error.message })
    }
    throw error
  }
}
