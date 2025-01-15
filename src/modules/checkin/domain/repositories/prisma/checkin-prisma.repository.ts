import { prisma } from '@/core/infra/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'

import { CheckInRepository } from '../checkin-repository.abstract'

export class CheckInPrismaRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const user = await prisma.checkIn.create({
      data,
    })

    return user
  }
}
