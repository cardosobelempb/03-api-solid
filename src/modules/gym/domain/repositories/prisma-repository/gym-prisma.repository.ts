import { Gym } from '@prisma/client'
import { GymRepository } from '../gym-repository.abstract'
import { prisma } from '@/core/infra/lib/prisma'

export class GymPrismaRepoitory implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    })
    return gym
  }
}
