import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'

describe('ValidationMetrics Class', () => {
  let validMarketSize: string
  let validAccessibility: number
  let validPainPointIntensity: number
  let validWillingnessToPay: number

  beforeEach(() => {
    validMarketSize = 'Large Enterprise Market'
    validAccessibility = 8
    validPainPointIntensity = 9
    validWillingnessToPay = 7
  })

  describe('Creation of ValidationMetrics', () => {
    it('should create a ValidationMetrics instance with valid inputs', () => {
      const metrics = ValidationMetrics.New(
        validMarketSize,
        validAccessibility,
        validPainPointIntensity,
        validWillingnessToPay
      )

      expect(metrics).toBeInstanceOf(ValidationMetrics)
      expect(metrics.getMarketSize()).toBe(validMarketSize)
      expect(metrics.getAccessibility()).toBe(validAccessibility)
      expect(metrics.getPainPointIntensity()).toBe(validPainPointIntensity)
      expect(metrics.getWillingnessToPay()).toBe(validWillingnessToPay)
    })

    it('should trim whitespace from market size', () => {
      const metrics = ValidationMetrics.New(
        '  Large Enterprise Market  ',
        validAccessibility,
        validPainPointIntensity,
        validWillingnessToPay
      )

      expect(metrics.getMarketSize()).toBe('Large Enterprise Market')
    })
  })

  describe('Validation', () => {
    describe('Market Size', () => {
      it('should throw error when market size is empty', () => {
        expect(() =>
          ValidationMetrics.New(
            '',
            validAccessibility,
            validPainPointIntensity,
            validWillingnessToPay
          )
        ).toThrow('Market size must not be empty')
      })

      it('should throw error when market size is only whitespace', () => {
        expect(() =>
          ValidationMetrics.New(
            '   ',
            validAccessibility,
            validPainPointIntensity,
            validWillingnessToPay
          )
        ).toThrow('Market size must not be empty')
      })
    })

    describe('Accessibility', () => {
      it('should throw error when accessibility is negative', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            -1,
            validPainPointIntensity,
            validWillingnessToPay
          )
        ).toThrow('Accessibility must be an integer between 0 and 10')
      })

      it('should throw error when accessibility is greater than 10', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            11,
            validPainPointIntensity,
            validWillingnessToPay
          )
        ).toThrow('Accessibility must be an integer between 0 and 10')
      })

      it('should throw error when accessibility is not an integer', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            7.5,
            validPainPointIntensity,
            validWillingnessToPay
          )
        ).toThrow('Accessibility must be an integer between 0 and 10')
      })
    })

    describe('Pain Point Intensity', () => {
      it('should throw error when pain point intensity is negative', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            validAccessibility,
            -1,
            validWillingnessToPay
          )
        ).toThrow('Pain point intensity must be an integer between 0 and 10')
      })

      it('should throw error when pain point intensity is greater than 10', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            validAccessibility,
            11,
            validWillingnessToPay
          )
        ).toThrow('Pain point intensity must be an integer between 0 and 10')
      })

      it('should throw error when pain point intensity is not an integer', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            validAccessibility,
            8.5,
            validWillingnessToPay
          )
        ).toThrow('Pain point intensity must be an integer between 0 and 10')
      })
    })

    describe('Willingness to Pay', () => {
      it('should throw error when willingness to pay is negative', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            validAccessibility,
            validPainPointIntensity,
            -1
          )
        ).toThrow('Willingness to pay must be an integer between 0 and 10')
      })

      it('should throw error when willingness to pay is greater than 10', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            validAccessibility,
            validPainPointIntensity,
            11
          )
        ).toThrow('Willingness to pay must be an integer between 0 and 10')
      })

      it('should throw error when willingness to pay is not an integer', () => {
        expect(() =>
          ValidationMetrics.New(
            validMarketSize,
            validAccessibility,
            validPainPointIntensity,
            9.5
          )
        ).toThrow('Willingness to pay must be an integer between 0 and 10')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should accept zero as valid score', () => {
      const metrics = ValidationMetrics.New(validMarketSize, 0, 0, 0)

      expect(metrics.getAccessibility()).toBe(0)
      expect(metrics.getPainPointIntensity()).toBe(0)
      expect(metrics.getWillingnessToPay()).toBe(0)
    })

    it('should accept ten as valid score', () => {
      const metrics = ValidationMetrics.New(validMarketSize, 10, 10, 10)

      expect(metrics.getAccessibility()).toBe(10)
      expect(metrics.getPainPointIntensity()).toBe(10)
      expect(metrics.getWillingnessToPay()).toBe(10)
    })

    it('should handle unicode characters in market size', () => {
      const metrics = ValidationMetrics.New(
        '大型企业市场',
        validAccessibility,
        validPainPointIntensity,
        validWillingnessToPay
      )

      expect(metrics.getMarketSize()).toBe('大型企业市场')
    })

    it('should handle special characters in market size', () => {
      const metrics = ValidationMetrics.New(
        'Enterprise & SMB Market (2024+)',
        validAccessibility,
        validPainPointIntensity,
        validWillingnessToPay
      )

      expect(metrics.getMarketSize()).toBe('Enterprise & SMB Market (2024+)')
    })
  })
})
