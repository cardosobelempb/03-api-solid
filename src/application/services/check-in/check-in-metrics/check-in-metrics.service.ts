import { CheckInRepository } from '@/domain/repositories/check-in/check-in-repository.abstract'

import { CheckInRequest } from '../../../request/check-in.request'
import { CheckInResponse } from '../../../response/check-in.response'

export class CheckInMetricsService {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: CheckInRequest.UserId): Promise<CheckInResponse.Count> {
    const checkInUserIdCount =
      await this.checkInRepository.countByUserId(userId)

    return { checkInUserIdCount }
  }
}
