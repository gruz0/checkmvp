import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'

describe('MarketAnalysis Class', () => {
  const validTrends = 'Increasing demand for eco-friendly products.'
  const validUserBehaviors = 'Users prefer online shopping over in-store.'
  const validMarketGaps = 'Lack of affordable options in the luxury segment.'
  const validInnovationOpportunities =
    'Integration of AI for personalized experiences.'
  const validStrategicDirection = 'Focus on mobile-first strategies.'

  describe('Successful Creation', () => {
    it('should create a MarketAnalysis instance with valid inputs', () => {
      const marketAnalysis = MarketAnalysis.New(
        validTrends,
        validUserBehaviors,
        validMarketGaps,
        validInnovationOpportunities,
        validStrategicDirection
      )

      expect(marketAnalysis).toBeInstanceOf(MarketAnalysis)
      expect(marketAnalysis.getTrends()).toBe(validTrends)
      expect(marketAnalysis.getUserBehaviors()).toBe(validUserBehaviors)
      expect(marketAnalysis.getMarketGaps()).toBe(validMarketGaps)
      expect(marketAnalysis.getInnovationOpportunities()).toBe(
        validInnovationOpportunities
      )
      expect(marketAnalysis.getStrategicDirection()).toBe(
        validStrategicDirection
      )
    })
  })

  describe('Validation Errors', () => {
    describe('Trends Property', () => {
      it('should throw an error when trends is empty', () => {
        expect(() =>
          MarketAnalysis.New(
            '',
            validUserBehaviors,
            validMarketGaps,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('Trends cannot be empty')
      })

      it('should throw an error when trends is whitespace', () => {
        expect(() =>
          MarketAnalysis.New(
            '   ',
            validUserBehaviors,
            validMarketGaps,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('Trends cannot be empty')
      })

      it('should throw an error when trends is null or undefined', () => {
        expect(() =>
          MarketAnalysis.New(
            null as unknown as string,
            validUserBehaviors,
            validMarketGaps,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('Trends cannot be empty')

        expect(() =>
          MarketAnalysis.New(
            undefined as unknown as string,
            validUserBehaviors,
            validMarketGaps,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('Trends cannot be empty')
      })
    })

    describe('UserBehaviors Property', () => {
      it('should throw an error when userBehaviors is empty', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            '',
            validMarketGaps,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('User behaviors cannot be empty')
      })

      it('should throw an error when userBehaviors is whitespace', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            '   ',
            validMarketGaps,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('User behaviors cannot be empty')
      })

      it('should throw an error when userBehaviors is null or undefined', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            null as unknown as string,
            validMarketGaps,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('User behaviors cannot be empty')

        expect(() =>
          MarketAnalysis.New(
            validTrends,
            undefined as unknown as string,
            validMarketGaps,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('User behaviors cannot be empty')
      })
    })

    describe('MarketGaps Property', () => {
      it('should throw an error when marketGaps is empty', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            '',
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('Market gaps cannot be empty')
      })

      it('should throw an error when marketGaps is whitespace', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            '   ',
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('Market gaps cannot be empty')
      })

      it('should throw an error when marketGaps is null or undefined', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            null as unknown as string,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('Market gaps cannot be empty')

        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            undefined as unknown as string,
            validInnovationOpportunities,
            validStrategicDirection
          )
        ).toThrow('Market gaps cannot be empty')
      })
    })

    describe('InnovationOpportunities Property', () => {
      it('should throw an error when innovationOpportunities is empty', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            validMarketGaps,
            '',
            validStrategicDirection
          )
        ).toThrow('Innovation opportunities cannot be empty')
      })

      it('should throw an error when innovationOpportunities is whitespace', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            validMarketGaps,
            '   ',
            validStrategicDirection
          )
        ).toThrow('Innovation opportunities cannot be empty')
      })

      it('should throw an error when innovationOpportunities is null or undefined', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            validMarketGaps,
            null as unknown as string,
            validStrategicDirection
          )
        ).toThrow('Innovation opportunities cannot be empty')

        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            validMarketGaps,
            undefined as unknown as string,
            validStrategicDirection
          )
        ).toThrow('Innovation opportunities cannot be empty')
      })
    })

    describe('StrategicDirection Property', () => {
      it('should throw an error when strategicDirection is empty', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            validMarketGaps,
            validInnovationOpportunities,
            ''
          )
        ).toThrow('Strategic direction cannot be empty')
      })

      it('should throw an error when strategicDirection is whitespace', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            validMarketGaps,
            validInnovationOpportunities,
            '   '
          )
        ).toThrow('Strategic direction cannot be empty')
      })

      it('should throw an error when strategicDirection is null or undefined', () => {
        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            validMarketGaps,
            validInnovationOpportunities,
            null as unknown as string
          )
        ).toThrow('Strategic direction cannot be empty')

        expect(() =>
          MarketAnalysis.New(
            validTrends,
            validUserBehaviors,
            validMarketGaps,
            validInnovationOpportunities,
            undefined as unknown as string
          )
        ).toThrow('Strategic direction cannot be empty')
      })
    })
  })

  describe('Getter Methods', () => {
    let marketAnalysis: MarketAnalysis

    beforeEach(() => {
      marketAnalysis = MarketAnalysis.New(
        validTrends,
        validUserBehaviors,
        validMarketGaps,
        validInnovationOpportunities,
        validStrategicDirection
      )
    })

    it('should return the correct trends', () => {
      expect(marketAnalysis.getTrends()).toBe(validTrends)
    })

    it('should return the correct userBehaviors', () => {
      expect(marketAnalysis.getUserBehaviors()).toBe(validUserBehaviors)
    })

    it('should return the correct marketGaps', () => {
      expect(marketAnalysis.getMarketGaps()).toBe(validMarketGaps)
    })

    it('should return the correct innovationOpportunities', () => {
      expect(marketAnalysis.getInnovationOpportunities()).toBe(
        validInnovationOpportunities
      )
    })

    it('should return the correct strategicDirection', () => {
      expect(marketAnalysis.getStrategicDirection()).toBe(
        validStrategicDirection
      )
    })
  })
})
