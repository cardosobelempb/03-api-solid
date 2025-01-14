import { InvalidCredentialsError } from '@/core/application/errors/invalid-credentials.erro'
import { UserPrismaRepository } from '@/modules/user/domain/repositories/prisma/user-prisma.repository'
import bcryptjs from 'bcryptjs'

import { UserReply } from '../../replys/user.reply'
import { UserRequest } from '../../request/user-register.request'

export class UserAuthenticationService {
  constructor(private userRepository: UserPrismaRepository) {}

  async execute({
    email,
    password,
  }: UserRequest.Authenticate): Promise<UserReply.Reply> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await bcryptjs.compare(
      password,
      user.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
