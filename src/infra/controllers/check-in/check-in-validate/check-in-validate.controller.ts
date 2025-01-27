import { checkInValidateMake } from '@/application/services/check-in/check-in-validate/check-in-validate.make'
import { CheckInValidation } from '@/infra/validations/check-in.validation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkInValidateController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { checkInId } = CheckInValidation.id.parse(request.params)
  const checkInValidate = checkInValidateMake()

  await checkInValidate.execute({ checkInId })

  return response.status(204).send()
}
