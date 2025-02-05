import { ContextAnalysis } from '@/idea/domain/ContextAnalysis'

describe('ContextAnalysis', () => {
  const validParams = {
    problemDefinition: 'A significant problem that needs solving',
    region: 'North America',
    marketExistence: ['Market exists in urban areas', 'Growing demand'],
    existingSolutions: ['Solution A', 'Solution B'],
    mainChallenges: ['Challenge 1', 'Challenge 2'],
    targetUsers: 'Small business owners',
    whyItMatters: 'It improves efficiency by 50%',
    opportunities: ['Opportunity 1', 'Opportunity 2'],
    callToAction: ['Sign up now', 'Learn more'],
    keyMetrics: [
      {
        label: 'Market Size',
        value: '5K -> 10K users',
        change: '+200%',
        trend: 'up' as const,
      },
    ],
    actionPriorities: [
      {
        action: 'Action 1',
        impact: 7,
        impactDescription: 'Impact description',
        effort: 3,
        effortDescription: 'Effort description',
      },
    ],
  }

  describe('New', () => {
    it('should create a new ContextAnalysis instance with valid parameters', () => {
      const contextAnalysis = ContextAnalysis.New(
        validParams.problemDefinition,
        validParams.region,
        validParams.marketExistence,
        validParams.existingSolutions,
        validParams.mainChallenges,
        validParams.targetUsers,
        validParams.whyItMatters,
        validParams.opportunities,
        validParams.callToAction,
        validParams.keyMetrics,
        validParams.actionPriorities
      )

      expect(contextAnalysis).toBeInstanceOf(ContextAnalysis)
    })

    it('should trim all string inputs', () => {
      const contextAnalysis = ContextAnalysis.New(
        '  ' + validParams.problemDefinition + '  ',
        '  ' + validParams.region + '  ',
        validParams.marketExistence.map((item) => '  ' + item + '  '),
        validParams.existingSolutions.map((item) => '  ' + item + '  '),
        validParams.mainChallenges.map((item) => '  ' + item + '  '),
        '  ' + validParams.targetUsers + '  ',
        '  ' + validParams.whyItMatters + '  ',
        validParams.opportunities.map((item) => '  ' + item + '  '),
        validParams.callToAction.map((item) => '  ' + item + '  '),
        validParams.keyMetrics,
        validParams.actionPriorities
      )

      expect(contextAnalysis.getProblemDefinition()).toBe(
        validParams.problemDefinition
      )
      expect(contextAnalysis.getRegion()).toBe(validParams.region)
      expect(contextAnalysis.getMarketExistence()).toEqual(
        validParams.marketExistence
      )
      expect(contextAnalysis.getExistingSolutions()).toEqual(
        validParams.existingSolutions
      )
      expect(contextAnalysis.getMainChallenges()).toEqual(
        validParams.mainChallenges
      )
      expect(contextAnalysis.getTargetUsers()).toBe(validParams.targetUsers)
      expect(contextAnalysis.getWhyItMatters()).toBe(validParams.whyItMatters)
      expect(contextAnalysis.getOpportunities()).toEqual(
        validParams.opportunities
      )
      expect(contextAnalysis.getCallToAction()).toEqual(
        validParams.callToAction
      )
    })

    describe('validation', () => {
      it('should throw error if problemDefinition is empty', () => {
        expect(() =>
          ContextAnalysis.New(
            '',
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Problem definition cannot be empty')
      })

      it('should throw error if region is empty', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            '',
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Region cannot be empty')
      })

      it('should throw error if marketExistence is empty array', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            [],
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Market existence cannot be empty')
      })

      it('should throw error if existingSolutions is empty array', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            [],
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Existing solutions cannot be empty')
      })

      it('should throw error if mainChallenges is empty array', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            [],
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Main challenges cannot be empty')
      })

      it('should throw error if targetUsers is empty', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            '',
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Target users cannot be empty')
      })

      it('should throw error if whyItMatters is empty', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            '',
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Why it matters cannot be empty')
      })

      it('should throw error if opportunities is empty array', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            [],
            validParams.callToAction,
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Opportunities cannot be empty')
      })

      it('should throw error if callToAction is empty array', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            [],
            validParams.keyMetrics,
            validParams.actionPriorities
          )
        ).toThrow('Call to action cannot be empty')
      })

      it('should throw error if keyMetrics is empty array', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            [],
            validParams.actionPriorities
          )
        ).toThrow('Key metrics cannot be empty')
      })

      it('should throw error if actionPriorities is empty array', () => {
        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            []
          )
        ).toThrow('Action priorities cannot be empty')
      })

      it('should throw error if action priority impact is not between 1 and 10', () => {
        const invalidActionPriorities = [
          {
            action: 'Action 1',
            impact: 11,
            impactDescription: 'Impact description',
            effort: 5,
            effortDescription: 'Effort description',
          },
        ]

        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            invalidActionPriorities
          )
        ).toThrow('Action priority impact must be between 1 and 10')
      })

      it('should throw error if action priority effort is not between 1 and 10', () => {
        const invalidActionPriorities = [
          {
            action: 'Action 1',
            impact: 5,
            impactDescription: 'Impact description',
            effort: 0,
            effortDescription: 'Effort description',
          },
        ]

        expect(() =>
          ContextAnalysis.New(
            validParams.problemDefinition,
            validParams.region,
            validParams.marketExistence,
            validParams.existingSolutions,
            validParams.mainChallenges,
            validParams.targetUsers,
            validParams.whyItMatters,
            validParams.opportunities,
            validParams.callToAction,
            validParams.keyMetrics,
            invalidActionPriorities
          )
        ).toThrow('Action priority effort must be between 1 and 10')
      })
    })
  })

  describe('getters', () => {
    let contextAnalysis: ContextAnalysis

    beforeEach(() => {
      contextAnalysis = ContextAnalysis.New(
        validParams.problemDefinition,
        validParams.region,
        validParams.marketExistence,
        validParams.existingSolutions,
        validParams.mainChallenges,
        validParams.targetUsers,
        validParams.whyItMatters,
        validParams.opportunities,
        validParams.callToAction,
        validParams.keyMetrics,
        validParams.actionPriorities
      )
    })

    it('should return immutable arrays from getters', () => {
      const marketExistence = contextAnalysis.getMarketExistence()
      const existingSolutions = contextAnalysis.getExistingSolutions()
      const mainChallenges = contextAnalysis.getMainChallenges()
      const opportunities = contextAnalysis.getOpportunities()
      const callToAction = contextAnalysis.getCallToAction()

      // Attempt to modify the arrays
      marketExistence.push('New market')
      existingSolutions.push('New solution')
      mainChallenges.push('New challenge')
      opportunities.push('New opportunity')
      callToAction.push('New CTA')

      // Verify original arrays are unchanged
      expect(contextAnalysis.getMarketExistence()).toEqual(
        validParams.marketExistence
      )
      expect(contextAnalysis.getExistingSolutions()).toEqual(
        validParams.existingSolutions
      )
      expect(contextAnalysis.getMainChallenges()).toEqual(
        validParams.mainChallenges
      )
      expect(contextAnalysis.getOpportunities()).toEqual(
        validParams.opportunities
      )
      expect(contextAnalysis.getCallToAction()).toEqual(
        validParams.callToAction
      )
    })

    it('should return immutable arrays from keyMetrics and actionPriorities getters', () => {
      const keyMetrics = contextAnalysis.getKeyMetrics()
      const actionPriorities = contextAnalysis.getActionPriorities()

      // Attempt to modify the arrays
      keyMetrics.push({
        label: 'New Metric',
        value: '1 -> 2',
        change: '+100%',
        trend: 'up',
      })
      actionPriorities.push({
        action: 'New Action',
        impact: 5,
        impactDescription: 'New Impact',
        effort: 5,
        effortDescription: 'New Effort',
      })

      // Verify original arrays are unchanged
      expect(contextAnalysis.getKeyMetrics()).toEqual(validParams.keyMetrics)
      expect(contextAnalysis.getActionPriorities()).toEqual(
        validParams.actionPriorities
      )
    })

    it('should validate key metric trend values', () => {
      const invalidKeyMetrics = [
        {
          label: 'Market Size',
          value: '5K -> 10K users',
          change: '+200%',
          trend: 'invalid' as 'up' | 'down' | 'neutral',
        },
      ]

      expect(() =>
        ContextAnalysis.New(
          validParams.problemDefinition,
          validParams.region,
          validParams.marketExistence,
          validParams.existingSolutions,
          validParams.mainChallenges,
          validParams.targetUsers,
          validParams.whyItMatters,
          validParams.opportunities,
          validParams.callToAction,
          invalidKeyMetrics,
          validParams.actionPriorities
        )
      ).toThrow('Invalid trend value. Must be up, down, or neutral')
    })
  })
})
