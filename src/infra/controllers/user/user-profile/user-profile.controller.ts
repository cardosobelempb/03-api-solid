import { userProfileMake } from '@/application/services/user/user-profile/user-profile.make'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function userProfileController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const getUserProfile = userProfileMake()

  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  return response
    .status(200)
    .send({ user: { ...user, password_hash: undefined } })
}
