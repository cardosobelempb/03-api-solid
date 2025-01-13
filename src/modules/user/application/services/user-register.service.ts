import { hash } from 'bcryptjs'
import { UserPrismaRepository } from '../../domain/repositories/prisma/user-prisma.repository'
import { UserRequest } from '../request/user-register.request'
import { FindByEmailError } from '@/core/application/errors/findby-email.error'

export class UserRegisterService {
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async execute({ name, email, password }: UserRequest.Register) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new FindByEmailError()
    }

    await this.userRepository.create({ name, email, password_hash })
  }
}
