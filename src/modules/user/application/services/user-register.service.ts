import { prisma } from '@/core/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUserRepository } from '../../domain/repositories/prisma/prisma-user.repository'
import { UserRequest } from '../requests/user-register.request'

export class UserRegisterService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async execute({ name, email, password }: UserRequest.Register) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.userRepository.create({ name, email, password_hash })
  }
}
