import { MaxDistanceError } from '@/core/application/errors/max-distance.error'
import { MaxNumberOfCheckInError } from '@/core/application/errors/max-number-of-check-in.erro'
import { CheckInInMenoryRepository } from '@/modules/check-in/domain/repositories/in-memory/check-in-in-memory.repository'
import { GymInMemoryRepoitory } from '@/modules/gym/domain/repositories/in-memory-repository/gym-in-memory.repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInCreateService } from './check-in-create.service'

let checkInRepository: CheckInInMenoryRepository
let gymRepository: GymInMemoryRepoitory
let sut: CheckInCreateService

describe('Check-in CheckInCreateService', async () => {
  beforeEach(async () => {
    checkInRepository = new CheckInInMenoryRepository()
    gymRepository = new GymInMemoryRepoitory()
    sut = new CheckInCreateService(checkInRepository, gymRepository)
    vi.useFakeTimers()

    await gymRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -6.6979476,
      longitude: -35.5407645,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.6979476,
      userLongitude: -35.5407645,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in-the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.6979476,
      userLongitude: -35.5407645,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -6.6979476,
        userLongitude: -35.5407645,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
  })

  it('should not be able to check-in twice but in diferent days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.6979476,
      userLongitude: -35.5407645,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.6979476,
      userLongitude: -35.5407645,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-6.6978657),
      longitude: new Decimal(-35.5384355),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -6.6979476,
        userLongitude: -35.5407645,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
