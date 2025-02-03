import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'

describe('LanguageAnalysis Class', () => {
  const validVagueTerms = ['soon', 'many', 'better']
  const validMissingContext = ['target market size', 'competition analysis']
  const validAmbiguousStatements = [
    'it will help users',
    'the system will handle that',
  ]

  describe('Constructor', () => {
    it('should create a LanguageAnalysis with valid inputs', () => {
      const analysis = LanguageAnalysis.New(
        validVagueTerms,
        validMissingContext,
        validAmbiguousStatements
      )

      expect(analysis.getVagueTerms()).toEqual(validVagueTerms)
      expect(analysis.getMissingContext()).toEqual(validMissingContext)
      expect(analysis.getAmbiguousStatements()).toEqual(
        validAmbiguousStatements
      )
    })

    it('should create a LanguageAnalysis with empty arrays', () => {
      const analysis = LanguageAnalysis.New([], [], [])

      expect(analysis.getVagueTerms()).toEqual([])
      expect(analysis.getMissingContext()).toEqual([])
      expect(analysis.getAmbiguousStatements()).toEqual([])
    })

    it('should throw an error if vague terms contain empty values', () => {
      expect(() =>
        LanguageAnalysis.New(
          ['term1', '', 'term2'],
          validMissingContext,
          validAmbiguousStatements
        )
      ).toThrow('Vague terms cannot contain empty values')
    })

    it('should throw an error if missing context contain empty values', () => {
      expect(() =>
        LanguageAnalysis.New(
          validVagueTerms,
          ['context1', ' ', 'context2'],
          validAmbiguousStatements
        )
      ).toThrow('Missing context cannot contain empty values')
    })

    it('should throw an error if ambiguous statements contain empty values', () => {
      expect(() =>
        LanguageAnalysis.New(validVagueTerms, validMissingContext, [
          'statement1',
          '\t',
          'statement2',
        ])
      ).toThrow('Ambiguous statements cannot contain empty values')
    })

    it('should trim all values', () => {
      const analysis = LanguageAnalysis.New(
        [' term1 ', '\tterm2\t'],
        [' context1 ', '\tcontext2\t'],
        [' statement1 ', '\tstatement2\t']
      )

      expect(analysis.getVagueTerms()).toEqual(['term1', 'term2'])
      expect(analysis.getMissingContext()).toEqual(['context1', 'context2'])
      expect(analysis.getAmbiguousStatements()).toEqual([
        'statement1',
        'statement2',
      ])
    })
  })

  describe('Getters', () => {
    it('should return immutable arrays', () => {
      const analysis = LanguageAnalysis.New(
        validVagueTerms,
        validMissingContext,
        validAmbiguousStatements
      )

      const vagueTerms = analysis.getVagueTerms()
      const missingContext = analysis.getMissingContext()
      const ambiguousStatements = analysis.getAmbiguousStatements()

      // Attempt to modify the returned arrays
      vagueTerms.push('new term')
      missingContext.push('new context')
      ambiguousStatements.push('new statement')

      // Original arrays should remain unchanged
      expect(analysis.getVagueTerms()).toEqual(validVagueTerms)
      expect(analysis.getMissingContext()).toEqual(validMissingContext)
      expect(analysis.getAmbiguousStatements()).toEqual(
        validAmbiguousStatements
      )
    })
  })
})
