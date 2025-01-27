import { CheckInPrismaRepository } from '@/domain/repositories/check-in/prisma/check-in-prisma.repository'

import { CheckInValidateService } from './check-in-validate.service'

export function checkInValidateMake() {
  const checkInRepository = new CheckInPrismaRepository()
  const service = new CheckInValidateService(checkInRepository)
  return service
}
