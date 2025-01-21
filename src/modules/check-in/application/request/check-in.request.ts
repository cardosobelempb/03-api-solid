export namespace CheckInRequest {
  export interface Request {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
  }

  export interface GetUserId {
    userId: string
  }

  export interface Pagination {
    userId: string
    page: number
  }
}
