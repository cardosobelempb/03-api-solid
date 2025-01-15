import { UserInMenoryRepository } from '@/modules/user/domain/repositories/in-memory/user-in-memory.repository'
import bcryptjs from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from '@/core/application/errors/invalid-credentials.erro'
import { UserAuthenticateService } from './user-authenticate.service'

describe('User authenticate service', () => {
  it('should be able to authenticate', async () => {
    const userRepository = new UserInMenoryRepository()
    const sut = new UserAuthenticateService(userRepository)
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
    const userRepository = new UserInMenoryRepository()
    const sut = new UserAuthenticateService(userRepository)
    const email = 'johndoe@example.com'

    expect(() =>
      sut.execute({
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new UserInMenoryRepository()
    const sut = new UserAuthenticateService(userRepository)
    const email = 'johndoe@example.com'

    await userRepository.create({
      name: 'Joth Doe',
      email,
      password_hash: await bcryptjs.hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
