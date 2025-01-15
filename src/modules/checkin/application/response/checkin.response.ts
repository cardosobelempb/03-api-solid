import { CheckIn } from '@prisma/client'

export namespace CheckinResponse {
  export interface Create {
    checkIn: CheckIn
  }
}
