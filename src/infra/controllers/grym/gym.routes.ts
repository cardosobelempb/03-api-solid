import { veriFyJwt } from '@/shared/infra/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { gymCreateController } from './gym-create/gym-create.controller'
import { gymFindNearbyController } from './gym-find-nearby/gym-find-nearby.controller'
import { gymSearchController } from './gym-search/gym-search.controller'
import { veriFyUserRole } from '@/shared/infra/middlewares/verify-user-role'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', veriFyJwt)

  app.post(
    '/gyms',
    { onRequest: [veriFyUserRole('ADMIN')] },
    gymCreateController,
  )
  app.get('/gyms/nearby', gymFindNearbyController)
  app.get('/gyms/search', gymSearchController)
}
