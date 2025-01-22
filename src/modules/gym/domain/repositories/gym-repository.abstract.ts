import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}
export abstract class GymRepository {
  abstract findById(id: string): Promise<Gym | null>
  abstract create(data: Prisma.GymCreateInput): Promise<Gym>
  abstract search(query: string, page: number): Promise<Gym[]>
  abstract findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}
