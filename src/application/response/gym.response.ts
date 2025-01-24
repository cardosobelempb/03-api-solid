import { Gym } from '@prisma/client'

export namespace GymResponse {
  export interface Find {
    gym: Gym
  }

  export interface FindAll {
    gyms: Gym[]
  }
}
