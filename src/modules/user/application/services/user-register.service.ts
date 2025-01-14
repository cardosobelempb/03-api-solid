import { FindByEmailError } from '@/core/application/errors/findby-email.error'
import { UserPrismaRepository } from '@/modules/user/domain/repositories/prisma/user-prisma.repository'
import bcryptjs from 'bcryptjs'

import { UserReply } from '../replys/user.reply'
import { UserRequest } from '../request/user-register.request'

export class UserRegisterService {
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async execute({
    name,
    email,
    password,
  }: UserRequest.Register): Promise<UserReply.Register> {
    const password_hash = await bcryptjs.hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new FindByEmailError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
