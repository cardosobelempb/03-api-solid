import { prisma } from '@/core/infra/lib/prisma'
import { Gym, Prisma } from '@prisma/client'

import { GymRepository } from '../gym-repository.abstract'

export class GymPrismaRepoitory implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    })
    return gym
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }
}
