import { UserPrismaRepository } from '@/modules/user/domain/repositories/prisma/user-prisma.repository'
import { UserRequest } from '../../request/user.request'
import { UserResponse } from '../../response/user.response'
import { ResourceNotFoundError } from '@/core/application/errors/resource-not-found.erro'

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
