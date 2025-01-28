import fastify from 'fastify'

import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from './shared/infra/env'
import { userRoutes } from './infra/controllers/user/user.routes'
import { gymRoutes } from './infra/controllers/grym/gym.routes'
import { checkInRoutes } from './infra/controllers/check-in/check-in.routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refresh_token',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(userRoutes, { prefix: '/api/v1' })
app.register(gymRoutes, { prefix: '/api/v1' })
app.register(checkInRoutes, { prefix: '/api/v1' })

app.setErrorHandler((error, _request, reply) => {
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_COOKIE') {
    return reply
      .status(401)
      .send({ message: 'Invalid JWT token.', code: error.code })
  }
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
