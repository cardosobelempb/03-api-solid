import { CheckInPrismaRepository } from '@/domain/repositories/check-in/prisma/check-in-prisma.repository'
import { GymPrismaRepoitory } from '@/domain/repositories/gym/prisma-repository/gym-prisma.repository'

import { CheckInCreateService } from './check-in-create.service'

export function checkInCreateMake() {
  const checkInRepository = new CheckInPrismaRepository()
  const gymRepository = new GymPrismaRepoitory()
  const service = new CheckInCreateService(checkInRepository, gymRepository)

  return service
}
