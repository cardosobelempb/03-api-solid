import { UserPrismaRepository } from '@/domain/repositories/user/prisma/user-prisma.repository'
import { UserRegisterService } from './user-register.service'

export function userRegisterMake() {
  const userRepsitory = new UserPrismaRepository()

  const service = new UserRegisterService(userRepsitory)
  return service
}
