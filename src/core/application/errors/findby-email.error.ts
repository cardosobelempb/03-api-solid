export class FindByEmailError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
