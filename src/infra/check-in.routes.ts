import { veriFyJwt } from '@/core/infra/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { checkInCreateController } from './controllers/check-in/check-in-create/check-in-create.controller'
import { checkInMetricsController } from './controllers/check-in/check-in-metrics/check-in-metrics.controller'

export async function checkInRoutes(app: FastifyInstance) {
  app.post('/check-ins', { onRequest: [veriFyJwt] }, checkInCreateController)
  app.get(
    '/check-ins/metrics',
    { onRequest: [veriFyJwt] },
    checkInMetricsController,
  )
  /* Authentication */
}
