export class ApplicationError extends Error {
  public readonly isApplicationError = true

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = 'ApplicationError'
  }
}
