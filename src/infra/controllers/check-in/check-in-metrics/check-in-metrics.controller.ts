import { checkInMetricsMake } from '@/application/services/check-in/check-in-metrics/check-in-metrics.make'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkInMetricsController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const checkInMetrics = checkInMetricsMake()

  const { checkInUserIdCount } = await checkInMetrics.execute({
    userId: request.user.sub,
  })

  return response.status(200).send({
    checkInUserIdCount,
  })
}
