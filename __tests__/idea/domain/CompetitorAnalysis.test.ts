import { Competitor } from '@/idea/domain/Competitor'
import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'

describe('CompetitorAnalysis Class', () => {
  let validCompetitor: Competitor
  let validCompetitors: Competitor[]
  let validComparison: { strengths: string[]; weaknesses: string[] }
  let validDifferentiationSuggestions: string[]

  beforeEach(() => {
    validCompetitor = Competitor.New(
      'Competitor A',
      'Product A',
      'https://competitor-a.com',
      ['Feature 1', 'Feature 2'],
      'Value Proposition A',
      'User Acquisition A',
      ['Strength 1'],
      ['Weakness 1'],
      'Differentiation Opportunity A'
    )

    validCompetitors = [validCompetitor]

    validComparison = {
      strengths: ['Strength A'],
      weaknesses: ['Weakness A'],
    }

    validDifferentiationSuggestions = ['Suggestion 1', 'Suggestion 2']
  })

  describe('Successful Creation', () => {
    it('should create a CompetitorAnalysis with valid inputs', () => {
      const analysis = CompetitorAnalysis.New(
        validCompetitors,
        validComparison,
        validDifferentiationSuggestions
      )

      expect(analysis).toBeInstanceOf(CompetitorAnalysis)
    })
  })

  describe('Validation Errors', () => {
    it('should throw an error when competitors array is empty', () => {
      expect(() =>
        CompetitorAnalysis.New(
          [],
          validComparison,
          validDifferentiationSuggestions
        )
      ).toThrow('Competitors cannot be empty')
    })

    it('should throw an error when competitors contain invalid instances', () => {
      const invalidCompetitors = [{} as Competitor]
      expect(() =>
        CompetitorAnalysis.New(
          invalidCompetitors,
          validComparison,
          validDifferentiationSuggestions
        )
      ).toThrow('Competitor at index 0 is invalid')
    })

    it('should throw an error when comparison is null or undefined', () => {
      expect(() =>
        CompetitorAnalysis.New(
          validCompetitors,
          null as unknown as { strengths: string[]; weaknesses: string[] },
          validDifferentiationSuggestions
        )
      ).toThrow('Comparison cannot be null or undefined')

      expect(() =>
        CompetitorAnalysis.New(
          validCompetitors,
          undefined as unknown as { strengths: string[]; weaknesses: string[] },
          validDifferentiationSuggestions
        )
      ).toThrow('Comparison cannot be null or undefined')
    })

    it('should throw an error when comparison strengths are empty', () => {
      const invalidComparison = { strengths: [], weaknesses: ['Weakness A'] }
      expect(() =>
        CompetitorAnalysis.New(
          validCompetitors,
          invalidComparison,
          validDifferentiationSuggestions
        )
      ).toThrow('Comparison strengths cannot be empty')
    })

    it('should throw an error when comparison weaknesses are empty', () => {
      const invalidComparison = { strengths: ['Strength A'], weaknesses: [] }
      expect(() =>
        CompetitorAnalysis.New(
          validCompetitors,
          invalidComparison,
          validDifferentiationSuggestions
        )
      ).toThrow('Comparison weaknesses cannot be empty')
    })

    it('should throw an error when differentiationSuggestions is not an array', () => {
      expect(() =>
        CompetitorAnalysis.New(
          validCompetitors,
          validComparison,
          null as unknown as string[]
        )
      ).toThrow('Differentiation suggestions must be an array')
    })
  })

  describe('Getter Methods', () => {
    let analysis: CompetitorAnalysis

    beforeEach(() => {
      analysis = CompetitorAnalysis.New(
        validCompetitors,
        validComparison,
        validDifferentiationSuggestions
      )
    })

    it('should return competitors via getCompetitors()', () => {
      const competitors = analysis.getCompetitors()
      expect(competitors).toEqual(validCompetitors)
    })

    it('should return comparison via getComparison()', () => {
      const comparison = analysis.getComparison()
      expect(comparison).toEqual(validComparison)
    })

    it('should return differentiationSuggestions via getDifferentiationSuggestions()', () => {
      const suggestions = analysis.getDifferentiationSuggestions()
      expect(suggestions).toEqual(validDifferentiationSuggestions)
    })
  })

  describe('Immutability', () => {
    let analysis: CompetitorAnalysis

    beforeEach(() => {
      analysis = CompetitorAnalysis.New(
        validCompetitors,
        validComparison,
        validDifferentiationSuggestions
      )
    })

    it('should prevent modification of competitors array', () => {
      const competitors = analysis.getCompetitors()
      competitors.push(validCompetitor)

      expect(analysis.getCompetitors()).toEqual(validCompetitors)
    })

    it('should prevent modification of comparison strengths', () => {
      const comparison = analysis.getComparison()
      comparison.strengths.push('strength')
      comparison.weaknesses.push('weakness')

      expect(analysis.getComparison()).toEqual(validComparison)
    })

    it('should prevent modification of differentiationSuggestions', () => {
      const suggestions = analysis.getDifferentiationSuggestions()
      suggestions.push('suggestion')

      expect(analysis.getDifferentiationSuggestions()).toEqual(
        validDifferentiationSuggestions
      )
    })
  })
})
