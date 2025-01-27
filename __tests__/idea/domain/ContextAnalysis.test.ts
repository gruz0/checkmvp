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
        validParams.callToAction
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
        validParams.callToAction.map((item) => '  ' + item + '  ')
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
            validParams.callToAction
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
            validParams.callToAction
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
            validParams.callToAction
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
            validParams.callToAction
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
            validParams.callToAction
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
            validParams.callToAction
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
            validParams.callToAction
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
            validParams.callToAction
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
            []
          )
        ).toThrow('Call to action cannot be empty')
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
        validParams.callToAction
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
  })
})
