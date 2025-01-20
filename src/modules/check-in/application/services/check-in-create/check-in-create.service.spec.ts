import { CheckInInMenoryRepository } from '@/modules/check-in/domain/repositories/in-memory/check-in-in-memory.repository'
import { CheckInCreateService } from './check-in-create.service'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GymInMemoryRepoitory } from '@/modules/gym/domain/repositories/in-memory-repository/gym-in-memory.repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: CheckInInMenoryRepository
let gymRepository: GymInMemoryRepoitory
let sut: CheckInCreateService
// -6.7534848,-35.6352,12
describe('Check-in CheckInCreateService', async () => {
  beforeEach(() => {
    checkInRepository = new CheckInInMenoryRepository()
    gymRepository = new GymInMemoryRepoitory()
    sut = new CheckInCreateService(checkInRepository, gymRepository)
    vi.useFakeTimers()

    gymRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.7534848,
      userLongitude: -35.6352,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in-the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.7534848,
      userLongitude: -35.6352,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -6.7534848,
        userLongitude: -35.6352,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check-in twice but in diferent days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.7534848,
      userLongitude: -35.6352,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.7534848,
      userLongitude: -35.6352,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
