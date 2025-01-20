import { CheckInInMenoryRepository } from '@/modules/check-in/domain/repositories/in-memory/check-in-in-memory.repository'
import { CheckInCreateService } from './check-in-create.service'

import { beforeEach, describe, expect, it } from 'vitest'

let checkInRepository: CheckInInMenoryRepository
let sut: CheckInCreateService

describe('Check-in CheckInCreateService', async () => {
  beforeEach(() => {
    checkInRepository = new CheckInInMenoryRepository()
    sut = new CheckInCreateService(checkInRepository)
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
