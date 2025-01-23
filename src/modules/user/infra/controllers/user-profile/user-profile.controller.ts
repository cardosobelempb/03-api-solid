import { FastifyReply, FastifyRequest } from 'fastify'

export async function userProfileController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  return response.send(200).send()
}
