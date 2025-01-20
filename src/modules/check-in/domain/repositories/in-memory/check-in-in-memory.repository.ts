import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { CheckInRepository } from '../check-in-repository.abstract'

export class CheckInInMenoryRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const checkInOnSameDate = this.items.find(item => item.user_id === userId)

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    this.items.push(checkIn)
    return checkIn
  }
}
