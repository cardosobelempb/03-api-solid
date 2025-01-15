import { FastifyInstance } from 'fastify'

export async function checkinRoutes(app: FastifyInstance) {
  app.post('/checkins')
}
