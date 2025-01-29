import { FastifyReply, FastifyRequest } from 'fastify'

export async function userRefreshController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true })
  const access_token = await response.jwtSign(
    { role: request.user.role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refresh_token = await response.jwtSign(
    { role: request.user.role },
    {
      sign: {
        sub: request.user.sub,
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
}
