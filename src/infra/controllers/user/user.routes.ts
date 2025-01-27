import { veriFyJwt } from '@/shared/infra/middlewares/verify-jwt'
import { userRegisterController } from '@/infra/controllers/user/user-register/user-register.controller'
import { FastifyInstance } from 'fastify'
import { userAuthenticateController } from './user-authenticate/user-authenticate.controller'
import { userProfileController } from './user-profile/user-profile.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', userRegisterController)
  app.post('/sessions', userAuthenticateController)

  /* Authentication */
  app.get('/me', { onRequest: [veriFyJwt] }, userProfileController)
}
