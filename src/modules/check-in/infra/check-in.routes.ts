import { FastifyInstance } from 'fastify'
import { veriFyJwt } from '@/core/infra/middlewares/verify-jwt'
import { checkInCreateController } from './controllers/check-in-create/check-in-create.controller'
import { checkInMetricsController } from './controllers/check-in-metrics/check-in-metrics.controller'

export async function checkInRoutes(app: FastifyInstance) {
  app.post('/check-ins', { onRequest: [veriFyJwt] }, checkInCreateController)
  app.get(
    '/check-ins/metrics',
    { onRequest: [veriFyJwt] },
    checkInMetricsController,
  )
  /* Authentication */
}
