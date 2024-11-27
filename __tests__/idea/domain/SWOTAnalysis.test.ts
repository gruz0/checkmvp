import { SWOTAnalysis } from '@/idea/domain/SWOTAnalysis'

describe('SWOTAnalysis Class', () => {
  const validStrengths = ['Strong brand', 'High customer loyalty']
  const validWeaknesses = ['Limited distribution channels', 'High costs']
  const validOpportunities = ['Market expansion', 'New technology adoption']
  const validThreats = ['Competitors', 'Market saturation']

  describe('Successful Creation', () => {
    it('should create a SWOTAnalysis instance with valid inputs', () => {
      const swot = SWOTAnalysis.New(
        validStrengths,
        validWeaknesses,
        validOpportunities,
        validThreats
      )

      expect(swot).toBeInstanceOf(SWOTAnalysis)
      expect(swot.getStrengths()).toEqual(validStrengths)
      expect(swot.getWeaknesses()).toEqual(validWeaknesses)
      expect(swot.getOpportunities()).toEqual(validOpportunities)
      expect(swot.getThreats()).toEqual(validThreats)
    })
  })

  describe('Validation Errors', () => {
    describe('Strengths Property', () => {
      it('should throw an error when strengths is empty array', () => {
        expect(() =>
          SWOTAnalysis.New(
            [],
            validWeaknesses,
            validOpportunities,
            validThreats
          )
        ).toThrow('Strengths cannot be empty')
      })

      it('should throw an error when strengths is null or undefined', () => {
        expect(() =>
          SWOTAnalysis.New(
            null as unknown as string[],
            validWeaknesses,
            validOpportunities,
            validThreats
          )
        ).toThrow('Strengths cannot be empty')

        expect(() =>
          SWOTAnalysis.New(
            undefined as unknown as string[],
            validWeaknesses,
            validOpportunities,
            validThreats
          )
        ).toThrow('Strengths cannot be empty')
      })

      it('should throw an error when strengths contains invalid elements', () => {
        const invalidStrengths = ['Valid Strength', '', '   ', null as any]
        expect(() =>
          SWOTAnalysis.New(
            invalidStrengths,
            validWeaknesses,
            validOpportunities,
            validThreats
          )
        ).toThrow(/Strength at index \d+ must be a non-empty string/)
      })
    })

    describe('Weaknesses Property', () => {
      it('should throw an error when weaknesses is empty array', () => {
        expect(() =>
          SWOTAnalysis.New(validStrengths, [], validOpportunities, validThreats)
        ).toThrow('Weaknesses cannot be empty')
      })

      it('should throw an error when weaknesses is null or undefined', () => {
        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            null as unknown as string[],
            validOpportunities,
            validThreats
          )
        ).toThrow('Weaknesses cannot be empty')

        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            undefined as unknown as string[],
            validOpportunities,
            validThreats
          )
        ).toThrow('Weaknesses cannot be empty')
      })

      it('should throw an error when weaknesses contains invalid elements', () => {
        const invalidWeaknesses = ['Valid Weakness', '', '   ', 123 as any]
        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            invalidWeaknesses,
            validOpportunities,
            validThreats
          )
        ).toThrow(/Weakness at index \d+ must be a non-empty string/)
      })
    })

    describe('Opportunities Property', () => {
      it('should throw an error when opportunities is empty array', () => {
        expect(() =>
          SWOTAnalysis.New(validStrengths, validWeaknesses, [], validThreats)
        ).toThrow('Opportunities cannot be empty')
      })

      it('should throw an error when opportunities is null or undefined', () => {
        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            validWeaknesses,
            null as unknown as string[],
            validThreats
          )
        ).toThrow('Opportunities cannot be empty')

        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            validWeaknesses,
            undefined as unknown as string[],
            validThreats
          )
        ).toThrow('Opportunities cannot be empty')
      })

      it('should throw an error when opportunities contains invalid elements', () => {
        const invalidOpportunities = ['Valid Opportunity', '', '   ', {} as any]
        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            validWeaknesses,
            invalidOpportunities,
            validThreats
          )
        ).toThrow(/Opportunity at index \d+ must be a non-empty string/)
      })
    })

    describe('Threats Property', () => {
      it('should throw an error when threats is empty array', () => {
        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            validWeaknesses,
            validOpportunities,
            []
          )
        ).toThrow('Threats cannot be empty')
      })

      it('should throw an error when threats is null or undefined', () => {
        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            validWeaknesses,
            validOpportunities,
            null as unknown as string[]
          )
        ).toThrow('Threats cannot be empty')

        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            validWeaknesses,
            validOpportunities,
            undefined as unknown as string[]
          )
        ).toThrow('Threats cannot be empty')
      })

      it('should throw an error when threats contains invalid elements', () => {
        const invalidThreats = ['Valid Threat', '', '   ', null as any]
        expect(() =>
          SWOTAnalysis.New(
            validStrengths,
            validWeaknesses,
            validOpportunities,
            invalidThreats
          )
        ).toThrow(/Threat at index \d+ must be a non-empty string/)
      })
    })
  })

  describe('Getter Methods', () => {
    let swot: SWOTAnalysis

    beforeEach(() => {
      swot = SWOTAnalysis.New(
        validStrengths,
        validWeaknesses,
        validOpportunities,
        validThreats
      )
    })

    it('should return the correct strengths', () => {
      expect(swot.getStrengths()).toEqual(validStrengths)
    })

    it('should return the correct weaknesses', () => {
      expect(swot.getWeaknesses()).toEqual(validWeaknesses)
    })

    it('should return the correct opportunities', () => {
      expect(swot.getOpportunities()).toEqual(validOpportunities)
    })

    it('should return the correct threats', () => {
      expect(swot.getThreats()).toEqual(validThreats)
    })
  })
})
