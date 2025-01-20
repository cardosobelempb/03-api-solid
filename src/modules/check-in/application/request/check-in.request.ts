export namespace CheckInRequest {
  export interface Create {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
  }
}
