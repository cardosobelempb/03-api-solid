import { Gym } from '@prisma/client'

export namespace GymResponse {
  export interface Response {
    gym: Gym
  }
}
