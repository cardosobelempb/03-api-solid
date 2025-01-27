import { app } from '@/app'
import { createAndAuthenicateUser } from '@/shared/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('GymSearchController', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gym', async () => {
    const { access_token } = await createAndAuthenicateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '83999999999',
        latitude: -6.6979476,
        longitude: -35.5407645,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description.',
        phone: '83999999999',
        latitude: -6.6979476,
        longitude: -35.5407645,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'JavaScript' })
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
