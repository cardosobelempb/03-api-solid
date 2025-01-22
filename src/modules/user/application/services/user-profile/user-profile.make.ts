import { UserPrismaRepository } from '@/modules/user/domain/repositories/prisma/user-prisma.repository'

import { UserProfileService } from './user-profile.service'

export function userProfileMake() {
  const userRepository = new UserPrismaRepository()
  const service = new UserProfileService(userRepository)
  return service
}
