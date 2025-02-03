import { ClarityScore } from '@/concept/domain/ClarityScore'

describe('ClarityScore Class', () => {
  const validOverallScore = 8
  const validMetrics = {
    problemClarity: 9,
    targetAudienceClarity: 8,
    scopeDefinition: 7,
    valuePropositionClarity: 8,
  }

  describe('Constructor', () => {
    it('should create a ClarityScore with valid inputs', () => {
      const clarityScore = ClarityScore.New(validOverallScore, validMetrics)

      expect(clarityScore.getOverallScore()).toBe(validOverallScore)
      expect(clarityScore.getMetrics()).toEqual(validMetrics)
    })

    it('should throw an error if overall score is not an integer', () => {
      expect(() => ClarityScore.New(8.5, validMetrics)).toThrow(
        'Overall score must be an integer'
      )
    })

    it('should throw an error if overall score is less than 0', () => {
      expect(() => ClarityScore.New(-1, validMetrics)).toThrow(
        'Overall score must be between 0 and 10'
      )
    })

    it('should throw an error if overall score is greater than 10', () => {
      expect(() => ClarityScore.New(11, validMetrics)).toThrow(
        'Overall score must be between 0 and 10'
      )
    })

    it('should throw an error if problem clarity score is not an integer', () => {
      expect(() =>
        ClarityScore.New(validOverallScore, {
          ...validMetrics,
          problemClarity: 7.5,
        })
      ).toThrow('Problem clarity score must be an integer')
    })

    it('should throw an error if problem clarity score is invalid', () => {
      expect(() =>
        ClarityScore.New(validOverallScore, {
          ...validMetrics,
          problemClarity: -1,
        })
      ).toThrow('Problem clarity score must be between 0 and 10')
    })

    it('should throw an error if target audience clarity score is not an integer', () => {
      expect(() =>
        ClarityScore.New(validOverallScore, {
          ...validMetrics,
          targetAudienceClarity: 8.5,
        })
      ).toThrow('Target audience clarity score must be an integer')
    })

    it('should throw an error if target audience clarity score is invalid', () => {
      expect(() =>
        ClarityScore.New(validOverallScore, {
          ...validMetrics,
          targetAudienceClarity: 11,
        })
      ).toThrow('Target audience clarity score must be between 0 and 10')
    })

    it('should throw an error if scope definition score is not an integer', () => {
      expect(() =>
        ClarityScore.New(validOverallScore, {
          ...validMetrics,
          scopeDefinition: 7.5,
        })
      ).toThrow('Scope definition score must be an integer')
    })

    it('should throw an error if scope definition score is invalid', () => {
      expect(() =>
        ClarityScore.New(validOverallScore, {
          ...validMetrics,
          scopeDefinition: -1,
        })
      ).toThrow('Scope definition score must be between 0 and 10')
    })

    it('should throw an error if value proposition clarity score is not an integer', () => {
      expect(() =>
        ClarityScore.New(validOverallScore, {
          ...validMetrics,
          valuePropositionClarity: 8.5,
        })
      ).toThrow('Value proposition clarity score must be an integer')
    })

    it('should throw an error if value proposition clarity score is invalid', () => {
      expect(() =>
        ClarityScore.New(validOverallScore, {
          ...validMetrics,
          valuePropositionClarity: 11,
        })
      ).toThrow('Value proposition clarity score must be between 0 and 10')
    })
  })

  describe('Getters', () => {
    it('should return immutable metrics object', () => {
      const clarityScore = ClarityScore.New(validOverallScore, validMetrics)
      const metrics = clarityScore.getMetrics()

      // Attempt to modify the returned metrics
      metrics.problemClarity = 5

      // Original metrics should remain unchanged
      expect(clarityScore.getMetrics()).toEqual(validMetrics)
    })
  })
})
