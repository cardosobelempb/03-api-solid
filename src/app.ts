import fastify from 'fastify'
import { userRoutes } from './modules/user/infra/userRoutes'

export const app = fastify()

app.register(userRoutes)
