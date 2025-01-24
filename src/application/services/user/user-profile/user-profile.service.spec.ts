import { ResourceNotFoundError } from '@/core/application/errors/resource-not-found.erro'
import { UserInMenoryRepository } from '@/domain/repositories/user/in-memory/user-in-memory.repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserProfileService } from './user-profile.service'

let userRepository: UserInMenoryRepository
let sut: UserProfileService

describe('UserProfileService', () => {
  beforeEach(() => {
    userRepository = new UserInMenoryRepository()
    sut = new UserProfileService(userRepository)
  })

  it('should be able to user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
