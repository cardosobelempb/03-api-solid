import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('UserRefreshController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/api/v1/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server)
      .post('/api/v1/auth/token')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/api/v1/auth/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refresh_token='),
    ])
  })
})
