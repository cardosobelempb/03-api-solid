import { CheckIn } from '@prisma/client'

export namespace CheckInResponse {
  export interface Find {
    checkIn: CheckIn
  }

  export interface FindAll {
    checkIns: CheckIn[]
  }

  export interface Count {
    checkInUserIdCount: number
  }
}
