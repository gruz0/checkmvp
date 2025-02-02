/**
 * Default implementation of TimeProvider that uses system time
 */
export class SystemTimeProvider implements TimeProvider {
  /**
   * Returns the current system date and time
   */
  public now(): Date {
    return new Date()
  }
}

/**
 * Interface defining the contract for providing current time
 */
export interface TimeProvider {
  /**
   * Returns the current date and time
   */
  now(): Date
}

/**
 * Fixed time provider useful for testing scenarios
 */
export class FixedTimeProvider implements TimeProvider {
  private readonly fixedDate: Date

  constructor(date: Date) {
    // Create a defensive copy of the date to prevent external modifications
    this.fixedDate = new Date(date.getTime())
  }

  /**
   * Returns the fixed date provided during construction
   */
  public now(): Date {
    // Return a new copy of the fixed date
    return new Date(this.fixedDate.getTime())
  }
}
