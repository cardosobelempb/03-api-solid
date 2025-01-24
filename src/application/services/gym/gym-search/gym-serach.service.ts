import { GymRepository } from '@/domain/repositories/gym/gym-repository.abstract'

import { GymRequest } from '../../../../../application/request/gym.request'
import { GymResponse } from '../../../../../application/response/gym.response'

export class GymSearchService {
  constructor(private readonly gymRepositpory: GymRepository) {}

  async execute({
    query,
    page,
  }: GymRequest.Search): Promise<GymResponse.FindAll> {
    const gyms = await this.gymRepositpory.search(query, page)
    return { gyms }
  }
}
