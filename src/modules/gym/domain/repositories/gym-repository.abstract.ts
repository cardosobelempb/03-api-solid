import { Gym } from '@prisma/client'
export abstract class GymRepository {
  abstract findById(id: string): Promise<Gym | null>
  // abstract create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
}
