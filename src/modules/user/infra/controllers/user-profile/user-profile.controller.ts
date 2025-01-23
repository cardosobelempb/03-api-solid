import { FastifyReply, FastifyRequest } from 'fastify'

export async function userProfileController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  await request.jwtVerify()
  console.log(request.user.sub)
  return response.send(200).send()
}
