import { CheckInRepository } from '@/modules/check-in/domain/repositories/check-in-repository.abstract'
import { CheckInRequest } from '../../request/check-in.request'
import { CheckInResponse } from '../../response/check-in.response'

export class CheckInHistoryUserService {
  constructor(private readonly checkInRepository: CheckInRepository) {}

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
