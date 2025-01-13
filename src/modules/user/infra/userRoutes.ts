import { userRegister } from '@/modules/user/infra/controllers/user-register.controller'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
}
