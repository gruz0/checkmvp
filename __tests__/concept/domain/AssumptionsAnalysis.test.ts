import { AssumptionsAnalysis } from '@/concept/domain/AssumptionsAnalysis'

describe('AssumptionsAnalysis Class', () => {
  const validCoreAssumptions = [
    'Users will adopt the new platform quickly',
    'Integration with existing tools is feasible',
  ]
  const validTestability = 7
  const validRiskLevel = 'medium' as const
  const validValidationMethods = [
    'User interviews',
    'Technical prototype',
    'Market research',
  ]

  describe('Creation of AssumptionsAnalysis', () => {
    it('should create an AssumptionsAnalysis instance with valid inputs', () => {
      const analysis = AssumptionsAnalysis.New(
        validCoreAssumptions,
        validTestability,
        validRiskLevel,
        validValidationMethods
      )

      expect(analysis).toBeInstanceOf(AssumptionsAnalysis)
      expect(analysis.getCoreAssumptions()).toEqual(validCoreAssumptions)
      expect(analysis.getTestability()).toBe(validTestability)
      expect(analysis.getRiskLevel()).toBe(validRiskLevel)
      expect(analysis.getValidationMethods()).toEqual(validValidationMethods)
    })

    it('should trim whitespace from core assumptions', () => {
      const analysis = AssumptionsAnalysis.New(
        ['  First assumption  ', '\tSecond assumption\t'],
        validTestability,
        validRiskLevel,
        validValidationMethods
      )

      expect(analysis.getCoreAssumptions()).toEqual([
        'First assumption',
        'Second assumption',
      ])
    })

    it('should trim whitespace from validation methods', () => {
      const analysis = AssumptionsAnalysis.New(
        validCoreAssumptions,
        validTestability,
        validRiskLevel,
        ['  Method one  ', '\tMethod two\t']
      )

      expect(analysis.getValidationMethods()).toEqual([
        'Method one',
        'Method two',
      ])
    })

    it('should return immutable arrays', () => {
      const analysis = AssumptionsAnalysis.New(
        validCoreAssumptions,
        validTestability,
        validRiskLevel,
        validValidationMethods
      )

      const assumptions = analysis.getCoreAssumptions()
      const methods = analysis.getValidationMethods()

      assumptions.push('New assumption')
      methods.push('New method')

      expect(analysis.getCoreAssumptions()).toEqual(validCoreAssumptions)
      expect(analysis.getValidationMethods()).toEqual(validValidationMethods)
    })
  })

  describe('Validation', () => {
    describe('Core Assumptions', () => {
      it('should throw error when core assumptions array is empty', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            [],
            validTestability,
            validRiskLevel,
            validValidationMethods
          )
        ).toThrow('Core assumptions must not be empty')
      })

      it('should throw error when any core assumption is empty', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            ['Valid assumption', ''],
            validTestability,
            validRiskLevel,
            validValidationMethods
          )
        ).toThrow('Core assumptions must not contain empty values')
      })

      it('should throw error when any core assumption is only whitespace', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            ['Valid assumption', '   '],
            validTestability,
            validRiskLevel,
            validValidationMethods
          )
        ).toThrow('Core assumptions must not contain empty values')
      })
    })

    describe('Testability', () => {
      it('should throw error when testability is negative', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            validCoreAssumptions,
            -1,
            validRiskLevel,
            validValidationMethods
          )
        ).toThrow('Testability must be an integer between 0 and 10')
      })

      it('should throw error when testability is greater than 10', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            validCoreAssumptions,
            11,
            validRiskLevel,
            validValidationMethods
          )
        ).toThrow('Testability must be an integer between 0 and 10')
      })

      it('should throw error when testability is not an integer', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            validCoreAssumptions,
            7.5,
            validRiskLevel,
            validValidationMethods
          )
        ).toThrow('Testability must be an integer between 0 and 10')
      })

      it('should accept zero as valid testability score', () => {
        const analysis = AssumptionsAnalysis.New(
          validCoreAssumptions,
          0,
          validRiskLevel,
          validValidationMethods
        )

        expect(analysis.getTestability()).toBe(0)
      })

      it('should accept ten as valid testability score', () => {
        const analysis = AssumptionsAnalysis.New(
          validCoreAssumptions,
          10,
          validRiskLevel,
          validValidationMethods
        )

        expect(analysis.getTestability()).toBe(10)
      })
    })

    describe('Risk Level', () => {
      it('should throw error for invalid risk level', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            validCoreAssumptions,
            validTestability,
            'invalid' as any,
            validValidationMethods
          )
        ).toThrow('Risk level must be high, medium, or low')
      })

      it.each(['high', 'medium', 'low'] as const)(
        'should accept %s as valid risk level',
        (riskLevel) => {
          const analysis = AssumptionsAnalysis.New(
            validCoreAssumptions,
            validTestability,
            riskLevel,
            validValidationMethods
          )

          expect(analysis.getRiskLevel()).toBe(riskLevel)
        }
      )
    })

    describe('Validation Methods', () => {
      it('should throw error when validation methods array is empty', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            validCoreAssumptions,
            validTestability,
            validRiskLevel,
            []
          )
        ).toThrow('Validation methods must not be empty')
      })

      it('should throw error when any validation method is empty', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            validCoreAssumptions,
            validTestability,
            validRiskLevel,
            ['Valid method', '']
          )
        ).toThrow('Validation methods must not contain empty values')
      })

      it('should throw error when any validation method is only whitespace', () => {
        expect(() =>
          AssumptionsAnalysis.New(
            validCoreAssumptions,
            validTestability,
            validRiskLevel,
            ['Valid method', '   ']
          )
        ).toThrow('Validation methods must not contain empty values')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle unicode characters in assumptions and methods', () => {
      const analysis = AssumptionsAnalysis.New(
        ['用户会快速采用新平台', '与现有工具的集成是可行的'],
        validTestability,
        validRiskLevel,
        ['用户访谈', '技术原型']
      )

      expect(analysis.getCoreAssumptions()).toEqual([
        '用户会快速采用新平台',
        '与现有工具的集成是可行的',
      ])
      expect(analysis.getValidationMethods()).toEqual(['用户访谈', '技术原型'])
    })

    it('should handle special characters in assumptions and methods', () => {
      const analysis = AssumptionsAnalysis.New(
        ['Integration w/ API (v2) works!', 'Users @ companies adopt quickly'],
        validTestability,
        validRiskLevel,
        ['A/B testing', 'API & SDK validation']
      )

      expect(analysis.getCoreAssumptions()).toEqual([
        'Integration w/ API (v2) works!',
        'Users @ companies adopt quickly',
      ])
      expect(analysis.getValidationMethods()).toEqual([
        'A/B testing',
        'API & SDK validation',
      ])
    })

    it('should handle multiple spaces in assumptions and methods', () => {
      const analysis = AssumptionsAnalysis.New(
        ['First   assumption', 'Second    assumption'],
        validTestability,
        validRiskLevel,
        ['First   method', 'Second    method']
      )

      expect(analysis.getCoreAssumptions()).toEqual([
        'First   assumption',
        'Second    assumption',
      ])
      expect(analysis.getValidationMethods()).toEqual([
        'First   method',
        'Second    method',
      ])
    })
  })
})
