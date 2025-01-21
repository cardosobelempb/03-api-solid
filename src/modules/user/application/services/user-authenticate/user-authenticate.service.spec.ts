import { InvalidCredentialsError } from '@/core/application/errors/invalid-credentials.erro'
import { UserInMenoryRepository } from '@/modules/user/domain/repositories/in-memory/user-in-memory.repository'
import bcryptjs from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserAuthenticateService } from './user-authenticate.service'

let userRepository: UserInMenoryRepository
let sut: UserAuthenticateService
describe('User authenticate service', () => {
  beforeEach(() => {
    userRepository = new UserInMenoryRepository()
    sut = new UserAuthenticateService(userRepository)
  })
  it('should be able to authenticate', async () => {
    const email = 'johndoe@example.com'

    await userRepository.create({
      name: 'Joth Doe',
      email,
      password_hash: await bcryptjs.hash('123456', 6),
    })

    const { user } = await sut.execute({
      email,
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@example.com'

    await expect(() =>
      sut.execute({
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@example.com'

    await userRepository.create({
      name: 'Joth Doe',
      email,
      password_hash: await bcryptjs.hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
