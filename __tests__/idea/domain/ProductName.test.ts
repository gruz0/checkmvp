import { ProductName } from '@/idea/domain/ProductName'

describe('ProductName Class', () => {
  const validProductName = 'MyProduct'
  const validDomains = ['myproduct.com', 'myproduct.io']
  const validWhy = 'Because it solves a big problem.'
  const validTagline = 'The best product ever.'
  const validTargetAudienceInsight = 'They need this product because...'
  const validSimilarNames = ['ProductX', 'ProductY']
  const validBrandingPotential = 'High potential for branding.'

  describe('Successful Creation', () => {
    it('should create a ProductName instance with valid inputs', () => {
      const productName = ProductName.New(
        validProductName,
        validDomains,
        validWhy,
        validTagline,
        validTargetAudienceInsight,
        validSimilarNames,
        validBrandingPotential
      )

      expect(productName).toBeInstanceOf(ProductName)
      expect(productName.getProductName()).toBe(validProductName)
      expect(productName.getDomains()).toEqual(validDomains)
      expect(productName.getWhy()).toBe(validWhy)
      expect(productName.getTagline()).toBe(validTagline)
      expect(productName.getTargetAudienceInsight()).toBe(
        validTargetAudienceInsight
      )
      expect(productName.getSimilarNames()).toEqual(validSimilarNames)
      expect(productName.getBrandingPotential()).toBe(validBrandingPotential)
    })
  })

  describe('Validation Errors', () => {
    describe('productName Property', () => {
      it('should throw an error when productName is empty', () => {
        expect(() =>
          ProductName.New(
            '',
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Product name cannot be empty')
      })

      it('should throw an error when productName is whitespace', () => {
        expect(() =>
          ProductName.New(
            '   ',
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Product name cannot be empty')
      })

      it('should throw an error when productName is null or undefined', () => {
        expect(() =>
          ProductName.New(
            null as unknown as string,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Product name cannot be empty')

        expect(() =>
          ProductName.New(
            undefined as unknown as string,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Product name cannot be empty')
      })
    })

    describe('domains Property', () => {
      it('should throw an error when domains is empty array', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            [],
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Domains cannot be empty')
      })

      it('should throw an error when domains is null or undefined', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            null as unknown as string[],
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Domains cannot be empty')

        expect(() =>
          ProductName.New(
            validProductName,
            undefined as unknown as string[],
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Domains cannot be empty')
      })

      it('should throw an error when domains contains invalid elements', () => {
        const invalidDomains = [
          'valid.com',
          '',
          '   ',
          null as unknown as string,
        ]
        expect(() =>
          ProductName.New(
            validProductName,
            invalidDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Each domain must be a non-empty string')
      })
    })

    describe('why Property', () => {
      it('should throw an error when why is empty', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            '',
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Why cannot be empty')
      })

      it('should throw an error when why is whitespace', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            '   ',
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Why cannot be empty')
      })

      it('should throw an error when why is null or undefined', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            null as unknown as string,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Why cannot be empty')

        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            undefined as unknown as string,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Why cannot be empty')
      })
    })

    describe('tagline Property', () => {
      it('should throw an error when tagline is empty', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            '',
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Tagline cannot be empty')
      })

      it('should throw an error when tagline is whitespace', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            '   ',
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Tagline cannot be empty')
      })

      it('should throw an error when tagline is null or undefined', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            null as unknown as string,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Tagline cannot be empty')

        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            undefined as unknown as string,
            validTargetAudienceInsight,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Tagline cannot be empty')
      })
    })

    describe('targetAudienceInsight Property', () => {
      it('should throw an error when targetAudienceInsight is empty', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            '',
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Target audience insight cannot be empty')
      })

      it('should throw an error when targetAudienceInsight is whitespace', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            '   ',
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Target audience insight cannot be empty')
      })

      it('should throw an error when targetAudienceInsight is null or undefined', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            null as unknown as string,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Target audience insight cannot be empty')

        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            undefined as unknown as string,
            validSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Target audience insight cannot be empty')
      })
    })

    describe('similarNames Property', () => {
      it('should throw an error when similarNames is empty array', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            [],
            validBrandingPotential
          )
        ).toThrow('Similar names cannot be empty')
      })

      it('should throw an error when similarNames is null or undefined', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            null as unknown as string[],
            validBrandingPotential
          )
        ).toThrow('Similar names cannot be empty')

        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            undefined as unknown as string[],
            validBrandingPotential
          )
        ).toThrow('Similar names cannot be empty')
      })

      it('should throw an error when similarNames contains invalid elements', () => {
        const invalidSimilarNames = [
          'ValidName',
          '',
          '   ',
          null as unknown as string,
        ]
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            invalidSimilarNames,
            validBrandingPotential
          )
        ).toThrow('Each similar name must be a non-empty string')
      })
    })

    describe('brandingPotential Property', () => {
      it('should throw an error when brandingPotential is empty', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            ''
          )
        ).toThrow('Branding potential cannot be empty')
      })

      it('should throw an error when brandingPotential is whitespace', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            '   '
          )
        ).toThrow('Branding potential cannot be empty')
      })

      it('should throw an error when brandingPotential is null or undefined', () => {
        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            null as unknown as string
          )
        ).toThrow('Branding potential cannot be empty')

        expect(() =>
          ProductName.New(
            validProductName,
            validDomains,
            validWhy,
            validTagline,
            validTargetAudienceInsight,
            validSimilarNames,
            undefined as unknown as string
          )
        ).toThrow('Branding potential cannot be empty')
      })
    })
  })

  describe('Getter Methods', () => {
    let productName: ProductName

    beforeEach(() => {
      productName = ProductName.New(
        validProductName,
        validDomains,
        validWhy,
        validTagline,
        validTargetAudienceInsight,
        validSimilarNames,
        validBrandingPotential
      )
    })

    it('should return the correct productName', () => {
      expect(productName.getProductName()).toBe(validProductName)
    })

    it('should return the correct domains', () => {
      expect(productName.getDomains()).toEqual(validDomains)
    })

    it('should return the correct why', () => {
      expect(productName.getWhy()).toBe(validWhy)
    })

    it('should return the correct tagline', () => {
      expect(productName.getTagline()).toBe(validTagline)
    })

    it('should return the correct targetAudienceInsight', () => {
      expect(productName.getTargetAudienceInsight()).toBe(
        validTargetAudienceInsight
      )
    })

    it('should return the correct similarNames', () => {
      expect(productName.getSimilarNames()).toEqual(validSimilarNames)
    })

    it('should return the correct brandingPotential', () => {
      expect(productName.getBrandingPotential()).toBe(validBrandingPotential)
    })
  })
})
