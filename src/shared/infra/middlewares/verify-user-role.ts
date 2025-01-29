import { FastifyReply, FastifyRequest } from 'fastify'

export function veriFyUserRole(roleToVeriry: 'ADMIN' | 'USER') {
  return async (request: FastifyRequest, response: FastifyReply) => {
    const { role } = request.user
    if (role !== roleToVeriry) {
      return response.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
