import { LateCheckInValidationError } from '@/core/application/errors/late-check-in-validation.error'
import { ResourceNotFoundError } from '@/core/application/errors/resource-not-found.erro'
import { CheckInInMenoryRepository } from '@/modules/check-in/domain/repositories/in-memory/check-in-in-memory.repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInValidateService } from './check-in-validate.service'

let checkiInRepository: CheckInInMenoryRepository
let sut: CheckInValidateService

describe('CheckInValidateService', () => {
  beforeEach(() => {
    checkiInRepository = new CheckInInMenoryRepository()
    sut = new CheckInValidateService(checkiInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createCheckIn = await checkiInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const { checkIn } = await sut.excute({ checkInId: createCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkiInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.excute({ checkInId: 'fakeId' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createCheckIn = await checkiInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOnMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOnMinutesInMs)

    await expect(() =>
      sut.excute({ checkInId: createCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
