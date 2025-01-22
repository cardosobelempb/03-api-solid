import { GymRepository } from '@/modules/gym/domain/repositories/gym-repository.abstract'
import { GymRequest } from '../../request/gym.request'
import { GymResponse } from '../../response/gym.response'

export class GymFindNearbyService {
  constructor(private readonly gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GymRequest.Location): Promise<GymResponse.FindAll> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      logitude: userLongitude,
    })

    return { gyms }
  }
}
