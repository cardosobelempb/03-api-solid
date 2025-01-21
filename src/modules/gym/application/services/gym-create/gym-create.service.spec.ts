import { GymInMemoryRepoitory } from '@/modules/gym/domain/repositories/in-memory-repository/gym-in-memory.repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { GymCreateService } from './gym-create.service'

let gymRepository: GymInMemoryRepoitory
let sut: GymCreateService

describe('GymCreateService', () => {
  beforeEach(() => {
    gymRepository = new GymInMemoryRepoitory()
    sut = new GymCreateService(gymRepository)
  })
  it('should be able to GymCreateService', async () => {
    const { gym } = await sut.excute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -6.6979476,
      longitude: -35.5407645,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
