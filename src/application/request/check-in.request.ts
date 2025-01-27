import { GymRequest } from './gym.request'
import { UserRequest } from './user.request'

export namespace CheckInRequest {
  export interface Request {
    userId: UserRequest.id
    gymId: GymRequest.Id
    userLatitude: number
    userLongitude: number
  }

  export interface Id {
    checkInId: string
  }

  export interface UserId {
    userId: string
  }

  export interface Pagination {
    userId: string
    page: number
  }
}
