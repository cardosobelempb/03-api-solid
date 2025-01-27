import { CheckInPrismaRepository } from '@/domain/repositories/check-in/prisma/check-in-prisma.repository'

import { CheckInRequest } from '../../../request/check-in.request'
import { CheckInResponse } from '../../../response/check-in.response'

export class CheckInHistoryUserService {
  constructor(private readonly checkInRepository: CheckInPrismaRepository) {}

  async execute({
    userId,
    page,
  }: CheckInRequest.Pagination): Promise<CheckInResponse.FindAll> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
