import { gymSearchMake } from '@/application/services/gym/gym-search/gym-search.make'
import { GymValidation } from '@/infra/validations/gym.validation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function gymSearchController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { query, page } = GymValidation.search.parse(request.query)

  const gymSearch = gymSearchMake()

  const { gyms } = await gymSearch.execute({ query, page })

  return response.status(201).send({
    gyms,
  })
}
