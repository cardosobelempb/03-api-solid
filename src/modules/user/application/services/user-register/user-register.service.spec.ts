import { FindByEmailError } from '@/core/application/errors/findby-email.error'
import { UserInMenoryRepository } from '@/modules/user/domain/repositories/in-memory/user-in-memory.repository'
import bcryptjs from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserRegisterService } from './user-register.service'

let userRepository: UserInMenoryRepository
let sut: UserRegisterService
describe('User registration service', () => {
  beforeEach(() => {
    userRepository = new UserInMenoryRepository()
    sut = new UserRegisterService(userRepository)
  })
  it('should be able to regitration', async () => {
    const email = 'johndoe@example.com'

    const { user } = await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon regitration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await bcryptjs.compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to regitration with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(FindByEmailError)
  })
})
