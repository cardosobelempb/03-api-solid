import { prisma } from '@/shared/infra/lib/prisma'
import { Gym, Prisma } from '@prisma/client'

import { FindManyNearbyParams, GymRepository } from '../gym-repository.abstract'

export class GymPrismaRepoitory implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    })
    return gym
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }

  async search(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: { title: { contains: query } },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
}
