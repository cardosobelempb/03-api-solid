import { FastifyInstance } from 'fastify'

export async function checkInRoutes(app: FastifyInstance) {
  app.post('/checkins')
}
