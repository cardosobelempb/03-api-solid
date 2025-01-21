import { Gym } from '@prisma/client'

export namespace GymResponse {
  export interface Response {
    gym: Gym
  }

  export interface Many {
    gyms: Gym[]
  }
}
