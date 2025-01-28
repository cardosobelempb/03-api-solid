import { app } from '@/app'
import { createAndAuthenicateUser } from '@/shared/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('GymFindNearbyController', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby a gym', async () => {
    const { access_token } = await createAndAuthenicateUser(app)

    await request(app.server)
      .post('/api/v1/gyms')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description.',
        phone: '83999999999',
        latitude: -6.6979476,
        longitude: -35.5407645,
      })

    await request(app.server)
      .post('/api/v1/gyms')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '83999999999',
        latitude: -27.0610928,
        longitude: -49.5229501,
      })

    const response = await request(app.server)
      .get('/api/v1/gyms/nearby')
      .query({ latitude: -6.6979476, longitude: -35.5407645 })
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect.objectContaining({
      title: 'JavaScript Gym',
    })
  })
})
