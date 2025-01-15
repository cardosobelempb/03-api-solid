import { CheckInPrismaRepository } from '@/modules/checkin/domain/repositories/prisma/checkin-prisma.repository'

import { CheckinRequest } from '../../request/checkin.request'
import { CheckinResponse } from '../../response/checkin.response'

export class CheckInCreateService {
  constructor(private readonly checkInRepository: CheckInPrismaRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckinRequest.Create): Promise<CheckinResponse.Create> {
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
