import { User } from '@prisma/client'

export namespace UserReply {
  export interface Reply {
    user: User
  }
  export interface Register {
    user: User
  }

  export interface Authenticate {
    email: string
    password: string
  }
}
