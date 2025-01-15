import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { CheckInRepository } from '../checkin-repository.abstract'

export class CheckInInMenoryRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: new Date(),
      created_at: new Date(),
    }
    this.items.push(checkIn)
    return checkIn
  }
}
