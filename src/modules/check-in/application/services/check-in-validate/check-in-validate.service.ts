import { CheckInRepository } from '@/modules/check-in/domain/repositories/check-in-repository.abstract'
import { CheckInRequest } from '../../request/check-in.request'
import { CheckInResponse } from '../../response/check-in.response'
import { ResourceNotFoundError } from '@/core/application/errors/resource-not-found.erro'

export class CheckInValidateService {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async excute({
    checkInId,
  }: CheckInRequest.Id): Promise<CheckInResponse.Find> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
