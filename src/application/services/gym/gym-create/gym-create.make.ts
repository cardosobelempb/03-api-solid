import { GymPrismaRepoitory } from '@/domain/repositories/gym/prisma-repository/gym-prisma.repository'

import { GymCreateService } from './gym-create.service'

export function gymCreateMake() {
  const gymRepository = new GymPrismaRepoitory()
  const service = new GymCreateService(gymRepository)
  return service
}
