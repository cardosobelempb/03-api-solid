import { CheckIn, Prisma } from '@prisma/client'

export abstract class CheckInRepository {
  abstract create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
