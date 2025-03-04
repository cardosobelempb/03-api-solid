import { MaxDistanceError } from '@/shared/application/errors/max-distance.error'
import { MaxNumberOfCheckInError } from '@/shared/application/errors/max-number-of-check-in.erro'
import { ResourceNotFoundError } from '@/shared/application/errors/resource-not-found.erro'
import { getDistanceBetweenCoordinates } from '@/shared/utils/get-distance-between-coodinates'
import { CheckInRepository } from '@/domain/repositories/check-in/check-in-repository.abstract'
import { GymPrismaRepoitory } from '@/domain/repositories/gym/prisma-repository/gym-prisma.repository'

import { CheckInRequest } from '../../../request/check-in.request'
import { CheckInResponse } from '../../../response/check-in.response'

export class CheckInCreateService {
  constructor(
    private readonly checkInRepository: CheckInRepository,
    private readonly gymRepository: GymPrismaRepoitory,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInRequest.Request): Promise<CheckInResponse.Find> {
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
