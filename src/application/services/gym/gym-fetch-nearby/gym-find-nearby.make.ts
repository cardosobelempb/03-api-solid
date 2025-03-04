import { GymPrismaRepoitory } from '@/domain/repositories/gym/prisma-repository/gym-prisma.repository'

import { GymFindNearbyService } from './gym-find-nearby.service'

export function gymFindNearbyMake() {
  const gymRepository = new GymPrismaRepoitory()
  const service = new GymFindNearbyService(gymRepository)
  return service
}
