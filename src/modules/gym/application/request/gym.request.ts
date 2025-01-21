export namespace GymRequest {
  export interface Create {
    title: string
    description?: string | null
    phone?: string | null
    latitude: number
    longitude: number
  }

  export interface Search {
    query: string
    page: number
  }
}
