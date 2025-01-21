import { GymPrismaRepoitory } from '@/modules/gym/domain/repositories/prisma-repository/gym-prisma.repository'

import { GymRequest } from '../../request/gym.request'
import { GymResponse } from '../../response/gym.response'

export class GymCreateService {
  constructor(private readonly gymRepository: GymPrismaRepoitory) {}

  async excute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymRequest.Create): Promise<GymResponse.Response> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      longitude,
      latitude,
    })

    return {
      gym,
    }
  }
}
