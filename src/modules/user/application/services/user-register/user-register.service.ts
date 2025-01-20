import { FindByEmailError } from '@/core/application/errors/findby-email.error'
import { UserPrismaRepository } from '@/modules/user/domain/repositories/prisma/user-prisma.repository'
import bcryptjs from 'bcryptjs'

import { UserResponse } from '../../response/user.response'
import { UserRequest } from '../../request/user.request'

export class UserRegisterService {
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async execute({
    name,
    email,
    password,
  }: UserRequest.Register): Promise<UserResponse.Register> {
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
