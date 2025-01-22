import { CheckInPrismaRepository } from '@/modules/check-in/domain/repositories/prisma/check-in-prisma.repository'

import { CheckInHistoryUserService } from './check-in-history-user.service'

export function checkInHistoryUserMake() {
  const checkInRepository = new CheckInPrismaRepository()
  const service = new CheckInHistoryUserService(checkInRepository)

  return service
}
