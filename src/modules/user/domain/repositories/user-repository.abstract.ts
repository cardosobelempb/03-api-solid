import { Prisma, User } from '@prisma/client'

export abstract class userRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(data: Prisma.UserUncheckedCreateInput): Promise<User>
}
