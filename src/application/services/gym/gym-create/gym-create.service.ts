import { GymRequest } from '@/application/request/gym.request'
import { GymResponse } from '@/application/response/gym.response'
import { GymPrismaRepoitory } from '@/domain/repositories/gym/prisma-repository/gym-prisma.repository'

export class GymCreateService {
  constructor(private readonly gymRepository: GymPrismaRepoitory) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymRequest.Create): Promise<GymResponse.Find> {
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
