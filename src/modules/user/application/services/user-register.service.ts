import { prisma } from '@/core/lib/prisma'
import { hash } from 'bcryptjs'
import { UserRequest } from '../replys/user-register.interface'

export async function userRegisterService({
  name,
  email,
  password,
}: UserRequest.Register) {
  const password_hash = await hash(password, 6)
  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: { name, email, password_hash },
  })
}
