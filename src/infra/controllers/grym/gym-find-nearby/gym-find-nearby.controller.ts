import { gymFindNearbyMake } from '@/application/services/gym/gym-fetch-nearby/gym-find-nearby.make'
import { GymValidation } from '@/infra/validations/gym.validation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function gymFindNearbyController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { latitude, longitude } = GymValidation.nearby.parse(request.query)

  const gymNearby = gymFindNearbyMake()

  const { gyms } = await gymNearby.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return response.status(201).send({
    gyms,
  })
}
