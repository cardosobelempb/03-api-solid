import { userRegister } from '@/modules/user/infra/controllers/user-register/user-register.controller'
import { FastifyInstance } from 'fastify'
import { userAuthenticateController } from './controllers/user-authenticate/user-authenticate.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
  app.post('/session', userAuthenticateController)
}
