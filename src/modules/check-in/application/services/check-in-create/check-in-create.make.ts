import { CheckInPrismaRepository } from '@/modules/check-in/domain/repositories/prisma/check-in-prisma.repository'

import { CheckInCreateService } from './check-in-create.service'

export function checkInCreateMake() {
  const checkInRepository = new CheckInPrismaRepository()
  const checkInCreateService = new CheckInCreateService(checkInRepository)

  return checkInCreateService
}
