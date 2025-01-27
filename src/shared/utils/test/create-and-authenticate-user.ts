import { FastifyInstance } from 'fastify'
import request from 'supertest'
export async function createAndAuthenicateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  })

  const auhtReponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { access_token } = auhtReponse.body

  return { access_token }
}
