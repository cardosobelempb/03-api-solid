import { UserRequest } from '@/application/request/user.request'
import { UserResponse } from '@/application/response/user.response'
import { FindByEmailError } from '@/core/application/errors/findby-email.error'
import { UserInMenoryRepository } from '@/domain/repositories/user/in-memory/user-in-memory.repository'
import bcryptjs from 'bcryptjs'

export class UserRegisterService {
  constructor(private readonly userRepository: UserInMenoryRepository) {}

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
