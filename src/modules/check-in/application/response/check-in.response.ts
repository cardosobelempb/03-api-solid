import { CheckIn } from '@prisma/client'

export namespace CheckInResponse {
  export interface Create {
    checkIn: CheckIn
  }
}
