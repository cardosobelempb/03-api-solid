import { checkInCreateMake } from '@/application/services/check-in/check-in-create/check-in-create.make'
import { CheckInValidation } from '@/infra/validations/check-in.validation'
import { GymValidation } from '@/infra/validations/gym.validation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkInCreateController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { userLatitude, userLongitude } = CheckInValidation.create.parse(
    request.body,
  )
  const { gymId } = GymValidation.id.parse(request.params)

  const checkInCreate = checkInCreateMake()

  await checkInCreate.execute({
    gymId,
    userId: request.user.sub,
    userLatitude,
    userLongitude,
  })

  return response.status(201).send()
}
