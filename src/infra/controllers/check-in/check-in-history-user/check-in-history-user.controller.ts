import { checkInHistoryUserMake } from '@/application/services/check-in/check-in-history-user/check-in-history-user.make'
import { CheckInValidation } from '@/infra/validations/check-in.validation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkInHistoryUserController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { page } = CheckInValidation.history.parse(request.query)

  const checkInHistory = checkInHistoryUserMake()

  const { checkIns } = await checkInHistory.execute({
    userId: request.user.sub,
    page,
  })

  return response.status(200).send({
    checkIns,
  })
}
