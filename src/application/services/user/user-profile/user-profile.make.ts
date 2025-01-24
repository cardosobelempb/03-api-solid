import { UserPrismaRepository } from '@/domain/repositories/user/prisma/user-prisma.repository'
import { UserProfileService } from './user-profile.service'

export function userProfileMake() {
  const userRepository = new UserPrismaRepository()
  const service = new UserProfileService(userRepository)
  return service
}
