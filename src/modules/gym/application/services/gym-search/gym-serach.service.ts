import { GymRepository } from '@/modules/gym/domain/repositories/gym-repository.abstract'

import { GymRequest } from '../../request/gym.request'
import { GymResponse } from '../../response/gym.response'

export class GymSearchService {
  constructor(private readonly gymRepositpory: GymRepository) {}

  async execute({ query, page }: GymRequest.Search): Promise<GymResponse.Many> {
    const gyms = await this.gymRepositpory.search(query, page)
    return { gyms }
  }
}
