import { FastifyReply, FastifyRequest } from 'fastify'

export async function veriFyJwt(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return response.status(401).send({ message: 'Unauthorized.' })
  }
}
