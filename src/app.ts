import fastify from 'fastify'

import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './shared/infra/env'
import { userRoutes } from './infra/controllers/user/user.routes'
import { gymRoutes } from './infra/controllers/grym/gym.routes'
import { checkInRoutes } from './infra/controllers/check-in/check-in.routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes)
app.register(gymRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO He we shold log to an external tool like Daao/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
