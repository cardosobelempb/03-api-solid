import { CheckInPrismaRepository } from '@/modules/checkin/domain/repositories/prisma/checkin-prisma.repository'

import { CheckInCreateService } from './checkin-create.service'

export function checkInCreateMake() {
  const checkInRepository = new CheckInPrismaRepository()
  const checkInCreateService = new CheckInCreateService(checkInRepository)

  return checkInCreateService
}
