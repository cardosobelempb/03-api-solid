import { veriFyJwt } from '@/shared/infra/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { checkInCreateController } from './check-in-create/check-in-create.controller'
import { checkInMetricsController } from './check-in-metrics/check-in-metrics.controller'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', veriFyJwt)
  app.post('/check-ins', checkInCreateController)
  app.get('/check-ins/metrics', checkInMetricsController)
}
