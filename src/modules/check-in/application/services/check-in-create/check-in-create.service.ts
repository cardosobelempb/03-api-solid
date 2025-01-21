import { MaxDistanceError } from '@/core/application/errors/max-distance.error'
import { MaxNumberOfCheckInError } from '@/core/application/errors/max-number-of-check-in.erro'
import { ResourceNotFoundError } from '@/core/application/errors/resource-not-found.erro'
import { getDistanceBetweenCoordinates } from '@/core/utils/get-distance-between-coodinates'
import { CheckInPrismaRepository } from '@/modules/check-in/domain/repositories/prisma/check-in-prisma.repository'
import { GymPrismaRepoitory } from '@/modules/gym/domain/repositories/prisma-repository/gym-prisma.repository'

import { CheckInRequest } from '../../request/check-in.request'
import { CheckInResponse } from '../../response/check-in.response'

export class CheckInCreateService {
  constructor(
    private readonly checkInRepository: CheckInPrismaRepository,
    private readonly gymRepository: GymPrismaRepoitory,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInRequest.Request): Promise<CheckInResponse.Get> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calcular distancia between user and gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserOnDate(
      userId,
      new Date(),
    )
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInError()
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
