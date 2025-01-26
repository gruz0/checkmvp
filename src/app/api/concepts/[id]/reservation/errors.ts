export class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500
  ) {
    super(message)
    this.name = 'ApplicationError'
  }
}

export class ConceptNotEvaluatedError extends ApplicationError {
  constructor(conceptId: string) {
    super(`Concept ${conceptId} was not evaluated`, 400)
    this.name = 'ConceptNotEvaluatedError'
  }
}

export class ConceptArchivedError extends ApplicationError {
  constructor(conceptId: string) {
    super(`Concept ${conceptId} was archived`, 400)
    this.name = 'ConceptArchivedError'
  }
}

export class ConceptEvaluationMissingError extends ApplicationError {
  constructor(conceptId: string) {
    super(`Concept ${conceptId} does not have evaluation`, 400)
    this.name = 'ConceptEvaluationMissingError'
  }
}
