import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'

describe('TargetAudience Class', () => {
  let validId: string
  let validSegment: string
  let validDescription: string
  let validChallenges: string[]
  let validWhy: string
  let validPainPoints: string[]
  let validTargetingStrategy: string
  let validStatement: string
  let validHypotheses: string[]
  let validValidationMetrics: ValidationMetrics

  beforeEach(() => {
    validId = 'id-1'
    validSegment = 'Software Developers'
    validDescription = 'Professional developers working in tech companies'
    validChallenges = ['Code quality', 'Time management']
    validWhy = 'Why'
    validPainPoints = ['Pain point 1', 'Pain point 2']
    validTargetingStrategy = 'Targeting strategy'
    validStatement =
      'We believe that all companies face the same documentation challenges'
    validHypotheses = [
      'All companies face the same documentation challenges',
      'Teams will switch completely from existing tools',
      'One solution fits all company sizes',
      'Integration with all platforms is equally important',
    ]
    validValidationMetrics = ValidationMetrics.New('Large', 8, 9, 7)
  })

  describe('Creation of TargetAudience', () => {
    it('should create a TargetAudience instance with valid inputs', () => {
      const targetAudience = TargetAudience.New(
        validId,
        validSegment,
        validDescription,
        validChallenges,
        validWhy,
        validPainPoints,
        validTargetingStrategy,
        validStatement,
        validHypotheses,
        validValidationMetrics
      )

      expect(targetAudience).toBeInstanceOf(TargetAudience)
      expect(targetAudience.getSegment()).toBe(validSegment)
      expect(targetAudience.getDescription()).toBe(validDescription)
      expect(targetAudience.getChallenges()).toEqual(validChallenges)
      expect(targetAudience.getStatement()).toBe(validStatement)
      expect(targetAudience.getHypotheses()).toEqual(validHypotheses)
      expect(targetAudience.getValidationMetrics()).toBe(validValidationMetrics)
    })

    it('should trim whitespace from segment and description', () => {
      const targetAudience = TargetAudience.New(
        validId,
        '  Software Developers  ',
        '  Professional developers  ',
        validChallenges,
        validWhy,
        validPainPoints,
        validTargetingStrategy,
        validStatement,
        validHypotheses,
        validValidationMetrics
      )

      expect(targetAudience.getSegment()).toBe('Software Developers')
      expect(targetAudience.getDescription()).toBe('Professional developers')
    })

    it('should trim whitespace from challenges', () => {
      const targetAudience = TargetAudience.New(
        validId,
        validSegment,
        validDescription,
        ['  Code quality  ', '  Time management  '],
        validWhy,
        validPainPoints,
        validTargetingStrategy,
        validStatement,
        validHypotheses,
        validValidationMetrics
      )

      expect(targetAudience.getChallenges()).toEqual([
        'Code quality',
        'Time management',
      ])
    })

    it('should return a copy of challenges array', () => {
      const targetAudience = TargetAudience.New(
        validId,
        validSegment,
        validDescription,
        validChallenges,
        validWhy,
        validPainPoints,
        validTargetingStrategy,
        validStatement,
        validHypotheses,
        validValidationMetrics
      )

      const challenges = targetAudience.getChallenges()
      challenges.push('New Challenge')

      expect(targetAudience.getChallenges()).toEqual(validChallenges)
    })
  })

  describe('Validation', () => {
    it('should throw error when id is empty', () => {
      expect(() =>
        TargetAudience.New(
          '',
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Id must not be empty')
    })

    it('should throw error when id is only whitespace', () => {
      expect(() =>
        TargetAudience.New(
          '   ',
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Id must not be empty')
    })

    it('should throw error when why is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          validChallenges,
          '',
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Why must not be empty')
    })

    it('should throw error when pain points array is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          [],
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('At least one pain point must be provided')
    })

    it('should throw error when any pain point is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          ['Valid pain point', ''],
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Pain points must not be empty')
    })

    it('should throw error when targeting strategy is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          '',
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Targeting strategy must not be empty')
    })

    it('should throw error when statement is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          '',
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Statement must not be empty')
    })

    it('should throw error when hypotheses array is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          [],
          validValidationMetrics
        )
      ).toThrow('At least one hypothesis must be provided')
    })

    it('should throw error when any hypothesis is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          ['Valid hypothesis', ''],
          validValidationMetrics
        )
      ).toThrow('Hypotheses must not be empty')
    })

    it('should throw error when segment is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          '',
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Segment must not be empty')
    })

    it('should throw error when segment is only whitespace', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          '   ',
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Segment must not be empty')
    })

    it('should throw error when description is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          '',
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Description must not be empty')
    })

    it('should throw error when description is only whitespace', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          '   ',
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Description must not be empty')
    })

    it('should throw error when challenges array is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          [],
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('At least one challenge must be provided')
    })

    it('should throw error when any challenge is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          ['Valid challenge', ''],
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Challenges must not be empty')
    })

    it('should throw error when any challenge is only whitespace', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validSegment,
          validDescription,
          ['Valid challenge', '   '],
          validWhy,
          validPainPoints,
          validTargetingStrategy,
          validStatement,
          validHypotheses,
          validValidationMetrics
        )
      ).toThrow('Challenges must not be empty')
    })
  })

  describe('Edge Cases', () => {
    it('should handle unicode characters in segment and description', () => {
      const targetAudience = TargetAudience.New(
        validId,
        '开发人员',
        '专业软件开发人员',
        validChallenges,
        validWhy,
        validPainPoints,
        validTargetingStrategy,
        validStatement,
        validHypotheses,
        validValidationMetrics
      )

      expect(targetAudience.getSegment()).toBe('开发人员')
      expect(targetAudience.getDescription()).toBe('专业软件开发人员')
    })

    it('should handle special characters in segment and description', () => {
      const targetAudience = TargetAudience.New(
        validId,
        'Dev & QA Teams!',
        'Software & QA professionals @ tech companies',
        validChallenges,
        validWhy,
        validPainPoints,
        validTargetingStrategy,
        validStatement,
        validHypotheses,
        validValidationMetrics
      )

      expect(targetAudience.getSegment()).toBe('Dev & QA Teams!')
      expect(targetAudience.getDescription()).toBe(
        'Software & QA professionals @ tech companies'
      )
    })

    it('should handle multiple spaces in challenges', () => {
      const targetAudience = TargetAudience.New(
        validId,
        validSegment,
        validDescription,
        ['Code   Quality', 'Time    Management'],
        validWhy,
        validPainPoints,
        validTargetingStrategy,
        validStatement,
        validHypotheses,
        validValidationMetrics
      )

      expect(targetAudience.getChallenges()).toEqual([
        'Code   Quality',
        'Time    Management',
      ])
    })
  })
})
