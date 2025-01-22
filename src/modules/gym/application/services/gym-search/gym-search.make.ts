import { GymPrismaRepoitory } from '@/modules/gym/domain/repositories/prisma-repository/gym-prisma.repository'

import { GymSearchService } from './gym-serach.service'

export function gymSearchMake() {
  const gymRepository = new GymPrismaRepoitory()
  const service = new GymSearchService(gymRepository)
  return service
}
