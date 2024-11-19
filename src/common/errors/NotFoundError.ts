export class NotFoundError extends Error {
  public readonly isNotFoundError = true

  constructor(message?: string) {
    super(message || 'Not Found')

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = 'NotFoundError'
  }
}
