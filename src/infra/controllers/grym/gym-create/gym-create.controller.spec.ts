import { app } from '@/app'
import { createAndAuthenicateUser } from '@/shared/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
describe('GymCreateController', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { access_token } = await createAndAuthenicateUser(app)

    const response = await request(app.server)
      .post('/api/v1/gyms')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description.',
        phone: '83999999999',
        latitude: -6.6979476,
        longitude: -35.5407645,
      })

    expect(response.statusCode).toEqual(201)
  })
})
