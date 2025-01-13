import { hash } from 'bcryptjs'
import { UserPrismaRepository } from '../../domain/repositories/prisma/user-prisma.repository'
import { UserRequest } from '../request/user-register.request'

export class UserRegisterService {
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async execute({ name, email, password }: UserRequest.Register) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.userRepository.create({ name, email, password_hash })
  }
}
