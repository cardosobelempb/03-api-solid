import { Gym } from '@prisma/client'
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
}
