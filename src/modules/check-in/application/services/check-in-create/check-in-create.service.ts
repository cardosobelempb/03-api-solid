import { CheckInPrismaRepository } from '@/modules/check-in/domain/repositories/prisma/check-in-prisma.repository'

import { CheckInRequest } from '../../request/check-in.request'
import { CheckInResponse } from '../../response/check-in.response'

export class CheckInCreateService {
  constructor(private readonly checkInRepository: CheckInPrismaRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInRequest.Create): Promise<CheckInResponse.Create> {
    const checkInOnSameDay = await this.checkInRepository.findByUserOnDate(
      userId,
      new Date(),
    )
    if (checkInOnSameDay) {
      throw new Error()
    }
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
      validated_at: new Date(),
    })

    return {
      checkIn,
    }
  }
}
