import { Problem } from '@/concept/domain/Problem'

describe('Problem Class', () => {
  describe('Creation of Problem', () => {
    it('should create a Problem instance with valid input', () => {
      const validProblem =
        'This is a valid problem statement that meets the minimum length requirement and provides meaningful context.'
      const problem = Problem.New(validProblem)

      expect(problem).toBeInstanceOf(Problem)
      expect(problem.getValue()).toBe(validProblem)
    })

    it('should trim whitespace from input', () => {
      const untrimmedProblem =
        '   This is a valid problem statement that meets the minimum length requirement and provides meaningful context.   '
      const trimmedProblem = untrimmedProblem.trim()
      const problem = Problem.New(untrimmedProblem)

      expect(problem.getValue()).toBe(trimmedProblem)
    })

    it('should throw error when input is empty', () => {
      expect(() => {
        Problem.New('')
      }).toThrow('Problem must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when input is only whitespace', () => {
      expect(() => {
        Problem.New('     ')
      }).toThrow('Problem must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when input is less than 64 characters', () => {
      const shortProblem = 'Too short problem statement'
      expect(() => {
        Problem.New(shortProblem)
      }).toThrow('Problem must be defined and between 64 and 2048 characters.')
    })

    it('should throw error when input exceeds 2048 characters', () => {
      const longProblem = 'a'.repeat(2049)
      expect(() => {
        Problem.New(longProblem)
      }).toThrow('Problem must be defined and between 64 and 2048 characters.')
    })

    it('should accept input at minimum length (64 characters)', () => {
      const minLengthProblem = 'a'.repeat(64)
      const problem = Problem.New(minLengthProblem)

      expect(problem.getValue()).toBe(minLengthProblem)
    })

    it('should accept input at maximum length (2048 characters)', () => {
      const maxLengthProblem = 'a'.repeat(2048)
      const problem = Problem.New(maxLengthProblem)

      expect(problem.getValue()).toBe(maxLengthProblem)
    })
  })

  describe('Edge Cases', () => {
    it('should handle unicode characters correctly', () => {
      const unicodeProblem =
        '🚀 This is a problem statement with emoji and unicode characters 测试 that meets minimum length'
      const problem = Problem.New(unicodeProblem)

      expect(problem.getValue()).toBe(unicodeProblem)
    })

    it('should handle special characters correctly', () => {
      const specialCharProblem =
        'This problem statement includes special chars: !@#$%^&*()_+-=[]{}|;:,.<>? and meets length'
      const problem = Problem.New(specialCharProblem)

      expect(problem.getValue()).toBe(specialCharProblem)
    })

    it('should handle multiple spaces correctly', () => {
      const multipleSpacesProblem =
        'This   problem    statement   has   multiple   spaces   but   meets   minimum   length'
      const problem = Problem.New(multipleSpacesProblem)

      expect(problem.getValue()).toBe(multipleSpacesProblem)
    })

    it('should handle newlines correctly', () => {
      const newlineProblem =
        'This problem statement\nhas newlines\nbut meets\nminimum length requirement'
      const problem = Problem.New(newlineProblem)

      expect(problem.getValue()).toBe(newlineProblem)
    })
  })
})
