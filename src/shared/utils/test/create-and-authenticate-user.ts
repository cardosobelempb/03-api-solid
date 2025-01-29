import { prisma } from '@/shared/infra/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
export async function createAndAuthenicateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'USER',
    },
  })

  const auhtReponse = await request(app.server)
    .post('/api/v1/auth/token')
    .send({
      email: 'johndoe@example.com',
      password: '123456',
    })

  const { access_token } = auhtReponse.body

  return { access_token }
}
