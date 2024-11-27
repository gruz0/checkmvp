import { Problem } from '@/idea/domain/Problem'

describe('Problem Class', () => {
  const validValue =
    'This is a valid problem description that is more than 30 characters long.'

  describe('Successful Creation', () => {
    it('should create a Problem instance with valid input', () => {
      const problem = Problem.New(validValue)
      expect(problem).toBeInstanceOf(Problem)
      expect(problem.getValue()).toBe(validValue.trim())
    })

    it('should create a Problem instance with exactly 30 characters', () => {
      const value = 'A'.repeat(30)
      const problem = Problem.New(value)
      expect(problem).toBeInstanceOf(Problem)
      expect(problem.getValue()).toBe(value)
    })

    it('should create a Problem instance with exactly 2048 characters', () => {
      const value = 'A'.repeat(2048)
      const problem = Problem.New(value)
      expect(problem).toBeInstanceOf(Problem)
      expect(problem.getValue()).toBe(value)
    })
  })

  describe('Validation Errors', () => {
    it('should throw an error when value is null', () => {
      expect(() => {
        Problem.New(null as unknown as string)
      }).toThrow('Problem must be a string.')
    })

    it('should throw an error when value is undefined', () => {
      expect(() => {
        Problem.New(undefined as unknown as string)
      }).toThrow('Problem must be a string.')
    })

    it('should throw an error when value is a number', () => {
      expect(() => {
        Problem.New(12345 as unknown as string)
      }).toThrow('Problem must be a string.')
    })

    it('should throw an error when value is an object', () => {
      expect(() => {
        Problem.New({} as unknown as string)
      }).toThrow('Problem must be a string.')
    })

    it('should throw an error when value is an empty string', () => {
      expect(() => {
        Problem.New('')
      }).toThrow('Problem cannot be empty.')
    })

    it('should throw an error when value is whitespace only', () => {
      expect(() => {
        Problem.New('    ')
      }).toThrow('Problem cannot be empty.')
    })

    it('should throw an error when value is less than 30 characters', () => {
      const value = 'A'.repeat(29)
      expect(() => {
        Problem.New(value)
      }).toThrow('Problem must be between 30 and 2048 characters.')
    })

    it('should throw an error when value is greater than 2048 characters', () => {
      const value = 'A'.repeat(2049)
      expect(() => {
        Problem.New(value)
      }).toThrow('Problem must be between 30 and 2048 characters.')
    })
  })

  describe('Getter Method', () => {
    it('should return the correct value from getValue()', () => {
      const problem = Problem.New(validValue)
      expect(problem.getValue()).toBe(validValue.trim())
    })
  })
})
