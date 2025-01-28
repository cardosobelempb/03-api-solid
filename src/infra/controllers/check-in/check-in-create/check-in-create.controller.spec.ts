import { app } from '@/app'
import { prisma } from '@/shared/infra/lib/prisma'
import { createAndAuthenicateUser } from '@/shared/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('CheckInCreateController', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { access_token } = await createAndAuthenicateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -6.6979476,
        longitude: -35.5407645,
      },
    })

    const response = await request(app.server)
      .post(`/api/v1/gym/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        gymId: gym.id,
        userLatitude: -6.6979476,
        userLongitude: -35.5407645,
      })

    expect(response.statusCode).toEqual(201)
  })
})
