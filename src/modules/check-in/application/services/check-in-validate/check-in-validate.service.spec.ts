import { CheckInInMenoryRepository } from '@/modules/check-in/domain/repositories/in-memory/check-in-in-memory.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInValidateService } from './check-in-validate.service'
import { ResourceNotFoundError } from '@/core/application/errors/resource-not-found.erro'

let checkiInRepository: CheckInInMenoryRepository
let sut: CheckInValidateService

describe('CheckInValidateService', () => {
  beforeEach(() => {
    checkiInRepository = new CheckInInMenoryRepository()
    sut = new CheckInValidateService(checkiInRepository)
  })
  it('should be able to validate the check-in', async () => {
    const createCheckIn = await checkiInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01s',
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
})
