import { CheckInPrismaRepository } from '@/domain/repositories/check-in/prisma/check-in-prisma.repository'

import { CheckInMetricsService } from './check-in-metrics.service'

export function chechInMetricsMake() {
  const checkInRepository = new CheckInPrismaRepository()
  const service = new CheckInMetricsService(checkInRepository)
  return service
}
