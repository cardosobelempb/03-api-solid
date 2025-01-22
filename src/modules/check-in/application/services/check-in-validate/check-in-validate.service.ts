import { LateCheckInValidationError } from '@/core/application/errors/late-check-in-validation.error'
import { ResourceNotFoundError } from '@/core/application/errors/resource-not-found.erro'
import { CheckInRepository } from '@/modules/check-in/domain/repositories/check-in-repository.abstract'
import dayjs from 'dayjs'

import { CheckInRequest } from '../../request/check-in.request'
import { CheckInResponse } from '../../response/check-in.response'

export class CheckInValidateService {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async excute({
    checkInId,
  }: CheckInRequest.Id): Promise<CheckInResponse.Find> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
