import { CheckIn, Prisma } from '@prisma/client'

export abstract class CheckInRepository {
  abstract create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  abstract findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null>
  abstract countByUserId(userId: string): Promise<number>
  abstract findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
}
