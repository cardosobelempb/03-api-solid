import { CheckInPrismaRepository } from '@/modules/check-in/domain/repositories/prisma/check-in-prisma.repository'

import { CheckInValidateService } from './check-in-validate.service'

export function chechInValidateMake() {
  const checkInRepository = new CheckInPrismaRepository()
  const service = new CheckInValidateService(checkInRepository)
  return service
}
