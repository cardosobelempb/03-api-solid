import { prisma } from '@/core/infra/lib/prisma'
import { Gym, Prisma } from '@prisma/client'

import { FindManyNearbyParams, GymRepository } from '../gym-repository.abstract'

export class GymPrismaRepoitory implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    })
    return gym
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }

  async search(query: string, page: number): Promise<Gym[]> {
    return await prisma.gym.findMany({
      where: { title: query },
      take: (page - 1) * 20,
      skip: page * 20,
    })
  }
}
