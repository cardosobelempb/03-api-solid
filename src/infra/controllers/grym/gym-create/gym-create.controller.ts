import { gymCreateMake } from '@/application/services/gym/gym-create/gym-create.make'
import { GymValidation } from '@/infra/validations/gym.validation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function gymCreateController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { title, description, phone, latitude, longitude } =
    GymValidation.create.parse(request.body)

  const gymCreate = gymCreateMake()

  await gymCreate.excute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return response.status(201).send()
}
