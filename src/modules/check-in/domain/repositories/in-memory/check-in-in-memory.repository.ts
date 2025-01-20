import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { CheckInRepository } from '../check-in-repository.abstract'
import dayjs from 'dayjs'

export class CheckInInMenoryRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find(item => {
      const checkInDate = dayjs(item.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return item.user_id === userId && isOnSameDate
    })
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
