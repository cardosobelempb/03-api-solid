import { CheckInPrismaRepository } from '@/modules/check-in/domain/repositories/prisma/check-in-prisma.repository'

import { CheckInRequest } from '../../request/check-in.request'
import { CheckInResponse } from '../../response/check-in.response'
import { GymRepository } from '@/modules/gym/domain/repositories/gym-repository.abstract'
import { ResourceNotFoundError } from '@/core/application/errors/resource-not-found.erro'

export class CheckInCreateService {
  constructor(
    private readonly checkInRepository: CheckInPrismaRepository,
    private readonly gymRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInRequest.Create): Promise<CheckInResponse.Create> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calcular distancia between user and gym

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
