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
}
