import { UserPrismaRepository } from '@/domain/repositories/user/prisma/user-prisma.repository'
import { UserAuthenticateService } from './user-authenticate.service'

export function userAuthenticateMake() {
  const userRepsitory = new UserPrismaRepository()
  const userAuthenticateService = new UserAuthenticateService(userRepsitory)

  return userAuthenticateService
}
