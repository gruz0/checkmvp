import { validate as uuidValidate, v4 as uuidv4 } from 'uuid'

export class Identity {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  /**
   * Creates a new Identity instance with the provided UUID.
   * @param value - A string representing a UUID.
   * @throws {Error} If the value is not a valid UUID.
   * @returns {Identity} A new Identity instance.
   */
  static New(value: string): Identity {
    if (!value || value.trim() === '') {
      throw new Error('Value cannot be empty')
    }

    if (!uuidValidate(value)) {
      throw new Error('Value must be a valid UUID')
    }

    return new Identity(value)
  }

  /**
   * Generates a new Identity instance with a randomly generated UUID.
   * @returns {Identity} A new Identity instance.
   */
  static Generate(): Identity {
    return new Identity(uuidv4())
  }

  /**
   * Retrieves the UUID value of the Identity.
   * @returns {string} The UUID string.
   */
  getValue(): string {
    return this.value
  }
}
