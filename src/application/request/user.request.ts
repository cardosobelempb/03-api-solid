export namespace UserRequest {
  export interface Register {
    name: string
    email: string
    password: string
  }

  export interface Authenticate {
    email: string
    password: string
  }

  export interface id {
    userId: string
  }

  export interface Profile {
    userId: string
  }
}
