import { userRegisterController } from '@/modules/user/infra/controllers/user-register/user-register.controller'
import { FastifyInstance } from 'fastify'
import { userAuthenticateController } from './controllers/user-authenticate/user-authenticate.controller'
import { userProfileController } from './controllers/user-profile/user-profile.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', userRegisterController)
  app.post('/session', userAuthenticateController)

  /* Authentication */
  app.get('/me', userProfileController)
}
