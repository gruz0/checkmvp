import { ValidationPlan } from '@/concept/domain/ValidationPlan'

describe('ValidationPlan Class', () => {
  const validQuickWins = [
    'Survey potential users',
    'Analyze competitor features',
  ]
  const validMediumEffort = ['Build MVP prototype', 'Conduct user interviews']
  const validDeepDive = [
    'Implement core functionality',
    'Run beta testing program',
  ]
  const validSuccessCriteria = [
    'Achieve 80% user satisfaction',
    'Reduce task time by 50%',
  ]

  describe('Creation of ValidationPlan', () => {
    it('should create a ValidationPlan instance with valid inputs', () => {
      const plan = ValidationPlan.New(
        validQuickWins,
        validMediumEffort,
        validDeepDive,
        validSuccessCriteria
      )

      expect(plan).toBeInstanceOf(ValidationPlan)
      expect(plan.getQuickWins()).toEqual(validQuickWins)
      expect(plan.getMediumEffort()).toEqual(validMediumEffort)
      expect(plan.getDeepDive()).toEqual(validDeepDive)
      expect(plan.getSuccessCriteria()).toEqual(validSuccessCriteria)
    })

    it('should trim whitespace from all arrays', () => {
      const plan = ValidationPlan.New(
        ['  Quick win 1  ', '\tQuick win 2\t'],
        ['  Medium effort 1  ', '\tMedium effort 2\t'],
        ['  Deep dive 1  ', '\tDeep dive 2\t'],
        ['  Success criteria 1  ', '\tSuccess criteria 2\t']
      )

      expect(plan.getQuickWins()).toEqual(['Quick win 1', 'Quick win 2'])
      expect(plan.getMediumEffort()).toEqual([
        'Medium effort 1',
        'Medium effort 2',
      ])
      expect(plan.getDeepDive()).toEqual(['Deep dive 1', 'Deep dive 2'])
      expect(plan.getSuccessCriteria()).toEqual([
        'Success criteria 1',
        'Success criteria 2',
      ])
    })

    it('should return immutable arrays', () => {
      const plan = ValidationPlan.New(
        validQuickWins,
        validMediumEffort,
        validDeepDive,
        validSuccessCriteria
      )

      const quickWins = plan.getQuickWins()
      const mediumEffort = plan.getMediumEffort()
      const deepDive = plan.getDeepDive()
      const successCriteria = plan.getSuccessCriteria()

      quickWins.push('New quick win')
      mediumEffort.push('New medium effort')
      deepDive.push('New deep dive')
      successCriteria.push('New success criteria')

      expect(plan.getQuickWins()).toEqual(validQuickWins)
      expect(plan.getMediumEffort()).toEqual(validMediumEffort)
      expect(plan.getDeepDive()).toEqual(validDeepDive)
      expect(plan.getSuccessCriteria()).toEqual(validSuccessCriteria)
    })
  })

  describe('Validation', () => {
    describe('Quick Wins', () => {
      it('should throw error when quick wins array is empty', () => {
        expect(() =>
          ValidationPlan.New(
            [],
            validMediumEffort,
            validDeepDive,
            validSuccessCriteria
          )
        ).toThrow('Quick wins must not be empty')
      })

      it('should throw error when any quick win is empty', () => {
        expect(() =>
          ValidationPlan.New(
            ['Valid quick win', ''],
            validMediumEffort,
            validDeepDive,
            validSuccessCriteria
          )
        ).toThrow('Quick wins must not contain empty values')
      })

      it('should throw error when any quick win is only whitespace', () => {
        expect(() =>
          ValidationPlan.New(
            ['Valid quick win', '   '],
            validMediumEffort,
            validDeepDive,
            validSuccessCriteria
          )
        ).toThrow('Quick wins must not contain empty values')
      })
    })

    describe('Medium Effort', () => {
      it('should throw error when medium effort array is empty', () => {
        expect(() =>
          ValidationPlan.New(
            validQuickWins,
            [],
            validDeepDive,
            validSuccessCriteria
          )
        ).toThrow('Medium effort tasks must not be empty')
      })

      it('should throw error when any medium effort task is empty', () => {
        expect(() =>
          ValidationPlan.New(
            validQuickWins,
            ['Valid task', ''],
            validDeepDive,
            validSuccessCriteria
          )
        ).toThrow('Medium effort tasks must not contain empty values')
      })

      it('should throw error when any medium effort task is only whitespace', () => {
        expect(() =>
          ValidationPlan.New(
            validQuickWins,
            ['Valid task', '   '],
            validDeepDive,
            validSuccessCriteria
          )
        ).toThrow('Medium effort tasks must not contain empty values')
      })
    })

    describe('Deep Dive', () => {
      it('should throw error when deep dive array is empty', () => {
        expect(() =>
          ValidationPlan.New(
            validQuickWins,
            validMediumEffort,
            [],
            validSuccessCriteria
          )
        ).toThrow('Deep dive tasks must not be empty')
      })

      it('should throw error when any deep dive task is empty', () => {
        expect(() =>
          ValidationPlan.New(
            validQuickWins,
            validMediumEffort,
            ['Valid task', ''],
            validSuccessCriteria
          )
        ).toThrow('Deep dive tasks must not contain empty values')
      })

      it('should throw error when any deep dive task is only whitespace', () => {
        expect(() =>
          ValidationPlan.New(
            validQuickWins,
            validMediumEffort,
            ['Valid task', '   '],
            validSuccessCriteria
          )
        ).toThrow('Deep dive tasks must not contain empty values')
      })
    })

    describe('Success Criteria', () => {
      it('should throw error when success criteria array is empty', () => {
        expect(() =>
          ValidationPlan.New(
            validQuickWins,
            validMediumEffort,
            validDeepDive,
            []
          )
        ).toThrow('Success criteria must not be empty')
      })

      it('should throw error when any success criterion is empty', () => {
        expect(() =>
          ValidationPlan.New(validQuickWins, validMediumEffort, validDeepDive, [
            'Valid criterion',
            '',
          ])
        ).toThrow('Success criteria must not contain empty values')
      })

      it('should throw error when any success criterion is only whitespace', () => {
        expect(() =>
          ValidationPlan.New(validQuickWins, validMediumEffort, validDeepDive, [
            'Valid criterion',
            '   ',
          ])
        ).toThrow('Success criteria must not contain empty values')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle unicode characters in all fields', () => {
      const plan = ValidationPlan.New(
        ['快速验证方案'],
        ['中等工作量任务'],
        ['深入研究项目'],
        ['成功标准指标']
      )

      expect(plan.getQuickWins()).toEqual(['快速验证方案'])
      expect(plan.getMediumEffort()).toEqual(['中等工作量任务'])
      expect(plan.getDeepDive()).toEqual(['深入研究项目'])
      expect(plan.getSuccessCriteria()).toEqual(['成功标准指标'])
    })

    it('should handle special characters in all fields', () => {
      const plan = ValidationPlan.New(
        ['Quick win @ 50%'],
        ['Medium & effort'],
        ['Deep-dive (v2)'],
        ['Success > 90%!']
      )

      expect(plan.getQuickWins()).toEqual(['Quick win @ 50%'])
      expect(plan.getMediumEffort()).toEqual(['Medium & effort'])
      expect(plan.getDeepDive()).toEqual(['Deep-dive (v2)'])
      expect(plan.getSuccessCriteria()).toEqual(['Success > 90%!'])
    })

    it('should handle multiple spaces in all fields', () => {
      const plan = ValidationPlan.New(
        ['Quick   win   task'],
        ['Medium   effort   task'],
        ['Deep   dive   task'],
        ['Success   criteria   task']
      )

      expect(plan.getQuickWins()).toEqual(['Quick   win   task'])
      expect(plan.getMediumEffort()).toEqual(['Medium   effort   task'])
      expect(plan.getDeepDive()).toEqual(['Deep   dive   task'])
      expect(plan.getSuccessCriteria()).toEqual(['Success   criteria   task'])
    })

    it('should handle newlines in all fields', () => {
      const plan = ValidationPlan.New(
        ['Quick win\ntask'],
        ['Medium effort\ntask'],
        ['Deep dive\ntask'],
        ['Success criteria\ntask']
      )

      expect(plan.getQuickWins()).toEqual(['Quick win\ntask'])
      expect(plan.getMediumEffort()).toEqual(['Medium effort\ntask'])
      expect(plan.getDeepDive()).toEqual(['Deep dive\ntask'])
      expect(plan.getSuccessCriteria()).toEqual(['Success criteria\ntask'])
    })
  })
})
