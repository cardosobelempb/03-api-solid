import { CheckInInMenoryRepository } from '@/modules/check-in/domain/repositories/in-memory/check-in-in-memory.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInHistoryUserService } from './check-in-history-user.service'

let checkInRepository: CheckInInMenoryRepository
let sut: CheckInHistoryUserService

describe('Check-in CheckInHistoryUserService', async () => {
  beforeEach(async () => {
    checkInRepository = new CheckInInMenoryRepository()
    sut = new CheckInHistoryUserService(checkInRepository)
  })

  it('should be able to many check-in history', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to many paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
