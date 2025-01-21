import { GymInMemoryRepoitory } from '@/modules/gym/domain/repositories/in-memory-repository/gym-in-memory.repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { GymSearchService } from './gym-serach.service'

let gymRepository: GymInMemoryRepoitory
let sut: GymSearchService

describe('Check-in GymSearchService', async () => {
  beforeEach(async () => {
    gymRepository = new GymInMemoryRepoitory()
    sut = new GymSearchService(gymRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -6.6979476,
      longitude: -35.5407645,
    })

    await gymRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -6.6979476,
      longitude: -35.5407645,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -6.6979476,
        longitude: -35.5407645,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
