import { User } from '@prisma/client'

export namespace UserResponse {
  export interface Response {
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
