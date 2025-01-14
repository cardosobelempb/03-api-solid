import { prisma } from '@/core/infra/lib/prisma'
import { Prisma, User } from '@prisma/client'

import { userRepository } from '../user-repository.abstract'

export class UserPrismaRepository implements userRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
