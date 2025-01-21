import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { GymRepository } from '../gym-repository.abstract'

export class GymInMemoryRepoitory implements GymRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find(item => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
    }
    this.items.push(gym)
    return gym
  }
}
