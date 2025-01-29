import { veriFyJwt } from '@/shared/infra/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { checkInCreateController } from './check-in-create/check-in-create.controller'
import { checkInHistoryUserController } from './check-in-history-user/check-in-history-user.controller'
import { checkInMetricsController } from './check-in-metrics/check-in-metrics.controller'
import { checkInValidateController } from './check-in-validate/check-in-validate.controller'
import { veriFyUserRole } from '@/shared/infra/middlewares/verify-user-role'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', veriFyJwt)

  app.post('/gym/:gymId/check-ins', checkInCreateController)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [veriFyUserRole('ADMIN')] },
    checkInValidateController,
  )
  app.get('/check-ins/history', checkInHistoryUserController)
  app.get('/check-ins/metrics', checkInMetricsController)
}
