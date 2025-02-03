import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'

describe('TargetAudience Class', () => {
  let validSegment: string
  let validDescription: string
  let validChallenges: string[]
  let validValidationMetrics: ValidationMetrics

  beforeEach(() => {
    validSegment = 'Software Developers'
    validDescription = 'Professional developers working in tech companies'
    validChallenges = ['Code quality', 'Time management']
    validValidationMetrics = ValidationMetrics.New('Large', 8, 9, 7)
  })

  describe('Creation of TargetAudience', () => {
    it('should create a TargetAudience instance with valid inputs', () => {
      const targetAudience = TargetAudience.New(
        validSegment,
        validDescription,
        validChallenges,
        validValidationMetrics
      )

      expect(targetAudience).toBeInstanceOf(TargetAudience)
      expect(targetAudience.getSegment()).toBe(validSegment)
      expect(targetAudience.getDescription()).toBe(validDescription)
      expect(targetAudience.getChallenges()).toEqual(validChallenges)
      expect(targetAudience.getValidationMetrics()).toBe(validValidationMetrics)
    })

    it('should trim whitespace from segment and description', () => {
      const targetAudience = TargetAudience.New(
        '  Software Developers  ',
        '  Professional developers  ',
        validChallenges,
        validValidationMetrics
      )

      expect(targetAudience.getSegment()).toBe('Software Developers')
      expect(targetAudience.getDescription()).toBe('Professional developers')
    })

    it('should trim whitespace from challenges', () => {
      const targetAudience = TargetAudience.New(
        validSegment,
        validDescription,
        ['  Code quality  ', '  Time management  '],
        validValidationMetrics
      )

      expect(targetAudience.getChallenges()).toEqual([
        'Code quality',
        'Time management',
      ])
    })

    it('should return a copy of challenges array', () => {
      const targetAudience = TargetAudience.New(
        validSegment,
        validDescription,
        validChallenges,
        validValidationMetrics
      )

      const challenges = targetAudience.getChallenges()
      challenges.push('New Challenge')

      expect(targetAudience.getChallenges()).toEqual(validChallenges)
    })
  })

  describe('Validation', () => {
    it('should throw error when segment is empty', () => {
      expect(() =>
        TargetAudience.New(
          '',
          validDescription,
          validChallenges,
          validValidationMetrics
        )
      ).toThrow('Segment must not be empty')
    })

    it('should throw error when segment is only whitespace', () => {
      expect(() =>
        TargetAudience.New(
          '   ',
          validDescription,
          validChallenges,
          validValidationMetrics
        )
      ).toThrow('Segment must not be empty')
    })

    it('should throw error when description is empty', () => {
      expect(() =>
        TargetAudience.New(
          validSegment,
          '',
          validChallenges,
          validValidationMetrics
        )
      ).toThrow('Description must not be empty')
    })

    it('should throw error when description is only whitespace', () => {
      expect(() =>
        TargetAudience.New(
          validSegment,
          '   ',
          validChallenges,
          validValidationMetrics
        )
      ).toThrow('Description must not be empty')
    })

    it('should throw error when challenges array is empty', () => {
      expect(() =>
        TargetAudience.New(
          validSegment,
          validDescription,
          [],
          validValidationMetrics
        )
      ).toThrow('At least one challenge must be provided')
    })

    it('should throw error when any challenge is empty', () => {
      expect(() =>
        TargetAudience.New(
          validSegment,
          validDescription,
          ['Valid challenge', ''],
          validValidationMetrics
        )
      ).toThrow('Challenges must not be empty')
    })

    it('should throw error when any challenge is only whitespace', () => {
      expect(() =>
        TargetAudience.New(
          validSegment,
          validDescription,
          ['Valid challenge', '   '],
          validValidationMetrics
        )
      ).toThrow('Challenges must not be empty')
    })
  })

  describe('Edge Cases', () => {
    it('should handle unicode characters in segment and description', () => {
      const targetAudience = TargetAudience.New(
        '开发人员',
        '专业软件开发人员',
        validChallenges,
        validValidationMetrics
      )

      expect(targetAudience.getSegment()).toBe('开发人员')
      expect(targetAudience.getDescription()).toBe('专业软件开发人员')
    })

    it('should handle special characters in segment and description', () => {
      const targetAudience = TargetAudience.New(
        'Dev & QA Teams!',
        'Software & QA professionals @ tech companies',
        validChallenges,
        validValidationMetrics
      )

      expect(targetAudience.getSegment()).toBe('Dev & QA Teams!')
      expect(targetAudience.getDescription()).toBe(
        'Software & QA professionals @ tech companies'
      )
    })

    it('should handle multiple spaces in challenges', () => {
      const targetAudience = TargetAudience.New(
        validSegment,
        validDescription,
        ['Code   Quality', 'Time    Management'],
        validValidationMetrics
      )

      expect(targetAudience.getChallenges()).toEqual([
        'Code   Quality',
        'Time    Management',
      ])
    })
  })
})
