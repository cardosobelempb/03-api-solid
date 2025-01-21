import { CheckIn } from '@prisma/client'

export namespace CheckInResponse {
  export interface Get {
    checkIn: CheckIn
  }

  export interface Many {
    checkIns: CheckIn[]
  }

  export interface Count {
    checkInUserIdCount: number
  }
}
