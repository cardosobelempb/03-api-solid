import { FastifyReply, FastifyRequest } from 'fastify'
import { userRegisterService } from '../../application/services/user-register.service'
import { UserSchema } from '../schemas/user-register.schema'

export async function userRegisterController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = UserSchema.register.parse(request.body)

  try {
    await userRegisterService({name, email, password})
  } catch (error) {
    return reply.status(401).send()
  }



  return reply.status(201).send()
}
