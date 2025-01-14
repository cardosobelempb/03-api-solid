import { User } from '@prisma/client'

export namespace UserReply {
  export interface Register {
    user: User
  }
}
