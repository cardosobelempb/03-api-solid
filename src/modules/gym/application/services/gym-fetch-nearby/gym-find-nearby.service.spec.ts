import { GymInMemoryRepoitory } from '@/modules/gym/domain/repositories/in-memory-repository/gym-in-memory.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GymFindNearbyService } from './gym-find-nearby.service'

let gymRepository: GymInMemoryRepoitory
let sut: GymFindNearbyService

describe('GymFindNearbyService', async () => {
  beforeEach(async () => {
    gymRepository = new GymInMemoryRepoitory()
    sut = new GymFindNearbyService(gymRepository)
  })

  it('should be able to find nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092852,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
