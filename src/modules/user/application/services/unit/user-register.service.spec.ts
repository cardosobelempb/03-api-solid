import bcryptjs from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserRegisterService } from '../user-register.service'
import { UserInMenoryRepository } from '@/core/domain/repositories/user-in-memory.repository'
import { FindByEmailError } from '@/core/application/errors/findby-email.error'
describe('User registration service', () => {
  it('should be able to regitration', async () => {
    const userRepository = new UserInMenoryRepository()
    const useRegisterService = new UserRegisterService(userRepository)
    const email = 'johndoe@example.com'

    const { user } = await useRegisterService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon regitration', async () => {
    const userRepository = new UserInMenoryRepository()
    const useRegisterService = new UserRegisterService(userRepository)

    const { user } = await useRegisterService.execute({
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
    const userRepository = new UserInMenoryRepository()
    const useRegisterService = new UserRegisterService(userRepository)
    const email = 'johndoe@example.com'

    await useRegisterService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      useRegisterService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(FindByEmailError)
  })
})
