import { UserRequest } from '@/application/request/user.request'
import { UserResponse } from '@/application/response/user.response'
import { ResourceNotFoundError } from '@/shared/application/errors/resource-not-found.erro'
import { UserPrismaRepository } from '@/domain/repositories/user/prisma/user-prisma.repository'

export class UserProfileService {
  constructor(private userRepository: UserPrismaRepository) {}
  async execute({
    userId,
  }: UserRequest.Profile): Promise<UserResponse.Response> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }
    return { user }
  }
}
