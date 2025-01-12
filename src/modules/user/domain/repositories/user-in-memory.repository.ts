import { Prisma } from '@prisma/client'

export class UserInMenoryRepository {
  public users: Prisma.UserUncheckedCreateInput[] = []
  async create(data: Prisma.UserUncheckedCreateInput) {
    this.users.push(data)
  }
}
