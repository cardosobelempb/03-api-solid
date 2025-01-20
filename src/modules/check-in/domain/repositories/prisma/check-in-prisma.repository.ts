import { prisma } from '@/core/infra/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'

import { CheckInRepository } from '../check-in-repository.abstract'

export class CheckInPrismaRepository implements CheckInRepository {
  async findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        user_id: userId,
      },
    })
    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const user = await prisma.checkIn.create({
      data,
    })

    return user
  }
}
