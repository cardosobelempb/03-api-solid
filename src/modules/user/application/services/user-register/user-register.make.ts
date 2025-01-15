import { UserPrismaRepository } from '@/modules/user/domain/repositories/prisma/user-prisma.repository'

import { UserRegisterService } from './user-register.service'

export function userRegisterMake() {
  const userRepsitory = new UserPrismaRepository()

  const userRegister = new UserRegisterService(userRepsitory)
  return userRegister
}
