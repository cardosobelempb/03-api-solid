import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
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

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }
    this.items.push(gym)
    return gym
  }

  async search(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter(item => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }
}
