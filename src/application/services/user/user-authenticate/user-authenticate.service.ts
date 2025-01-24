import { UserRequest } from '@/application/request/user.request'
import { UserResponse } from '@/application/response/user.response'
import { InvalidCredentialsError } from '@/core/application/errors/invalid-credentials.erro'
import { UserPrismaRepository } from '@/domain/repositories/user/prisma/user-prisma.repository'
import bcryptjs from 'bcryptjs'

export class UserAuthenticateService {
  constructor(private userRepository: UserPrismaRepository) {}

  async execute({
    email,
    password,
  }: UserRequest.Authenticate): Promise<UserResponse.Response> {
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
