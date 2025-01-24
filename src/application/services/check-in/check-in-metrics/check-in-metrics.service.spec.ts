import { CheckInInMenoryRepository } from '@/domain/repositories/check-in/in-memory/check-in-in-memory.repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { CheckInMetricsService } from './check-in-metrics.service'

let checkInRepository: CheckInInMenoryRepository
let sut: CheckInMetricsService

describe('Check-in CheckInMetricsService', async () => {
  beforeEach(async () => {
    checkInRepository = new CheckInInMenoryRepository()
    sut = new CheckInMetricsService(checkInRepository)
  })

  it('should be able to check-in from count metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInUserIdCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInUserIdCount).toEqual(2)
  })
})
