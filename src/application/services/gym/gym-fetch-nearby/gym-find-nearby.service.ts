import { GymRequest } from '@/application/request/gym.request'
import { GymResponse } from '@/application/response/gym.response'
import { GymRepository } from '@/domain/repositories/gym/gym-repository.abstract'

export class GymFindNearbyService {
  constructor(private readonly gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GymRequest.Location): Promise<GymResponse.FindAll> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
