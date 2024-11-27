import { Competitor } from '@/idea/domain/Competitor'

describe('Competitor Class', () => {
  const validName = 'Competitor A'
  const validProductName = 'Product A'
  const validUrl = 'https://competitor-a.com'
  const validCoreFeatures = ['Feature 1', 'Feature 2']
  const validValueProposition = 'Offers affordable solutions'
  const validUserAcquisition = 'Online marketing and SEO'
  const validStrengths = ['Strong brand presence']
  const validWeaknesses = ['Limited customer support']
  const validDifferentiationOpportunity = 'Better customer service'

  describe('Successful Creation', () => {
    it('should create a Competitor instance with valid inputs', () => {
      const competitor = Competitor.New(
        validName,
        validProductName,
        validUrl,
        validCoreFeatures,
        validValueProposition,
        validUserAcquisition,
        validStrengths,
        validWeaknesses,
        validDifferentiationOpportunity
      )

      expect(competitor).toBeInstanceOf(Competitor)
      expect(competitor.getName()).toBe(validName)
      expect(competitor.getProductName()).toBe(validProductName)
      expect(competitor.getUrl()).toBe(validUrl)
      expect(competitor.getCoreFeatures()).toEqual(validCoreFeatures)
      expect(competitor.getValueProposition()).toBe(validValueProposition)
      expect(competitor.getUserAcquisition()).toBe(validUserAcquisition)
      expect(competitor.getStrengths()).toEqual(validStrengths)
      expect(competitor.getWeaknesses()).toEqual(validWeaknesses)
      expect(competitor.getDifferentiationOpportunity()).toBe(
        validDifferentiationOpportunity
      )
    })
  })

  describe('Validation Errors', () => {
    describe('Name Property', () => {
      it('should throw an error when name is empty', () => {
        expect(() =>
          Competitor.New(
            '',
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Competitor name cannot be empty')
      })

      it('should throw an error when name is whitespace', () => {
        expect(() =>
          Competitor.New(
            '   ',
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Competitor name cannot be empty')
      })

      it('should throw an error when name is null or undefined', () => {
        expect(() =>
          Competitor.New(
            null as unknown as string,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Competitor name cannot be empty')

        expect(() =>
          Competitor.New(
            undefined as unknown as string,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Competitor name cannot be empty')
      })
    })

    describe('ProductName Property', () => {
      it('should throw an error when productName is empty', () => {
        expect(() =>
          Competitor.New(
            validName,
            '',
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Product name cannot be empty')
      })

      it('should throw an error when productName is whitespace', () => {
        expect(() =>
          Competitor.New(
            validName,
            '   ',
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Product name cannot be empty')
      })

      it('should throw an error when productName is null or undefined', () => {
        expect(() =>
          Competitor.New(
            validName,
            null as unknown as string,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Product name cannot be empty')

        expect(() =>
          Competitor.New(
            validName,
            undefined as unknown as string,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Product name cannot be empty')
      })
    })

    describe('URL Property', () => {
      it('should throw an error when url is empty', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            '',
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('URL cannot be empty')
      })

      it('should throw an error when url is whitespace', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            '   ',
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('URL cannot be empty')
      })

      it('should throw an error when url is null or undefined', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            null as unknown as string,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('URL cannot be empty')

        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            undefined as unknown as string,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('URL cannot be empty')
      })

      it('should throw an error when url is not valid', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            'domain.tld',
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('URL is not valid')
      })
    })

    describe('CoreFeatures Property', () => {
      it('should throw an error when coreFeatures is empty array', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            [],
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Core features cannot be empty')
      })

      it('should throw an error when coreFeatures is null or undefined', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            null as unknown as string[],
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Core features cannot be empty')

        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            undefined as unknown as string[],
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Core features cannot be empty')
      })
    })

    describe('ValueProposition Property', () => {
      it('should throw an error when valueProposition is empty', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            '',
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Value proposition cannot be empty')
      })

      it('should throw an error when valueProposition is whitespace', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            '   ',
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Value proposition cannot be empty')
      })

      it('should throw an error when valueProposition is null or undefined', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            null as unknown as string,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Value proposition cannot be empty')

        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            undefined as unknown as string,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Value proposition cannot be empty')
      })
    })

    describe('UserAcquisition Property', () => {
      it('should throw an error when userAcquisition is empty', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            '',
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('User acquisition cannot be empty')
      })

      it('should throw an error when userAcquisition is whitespace', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            '   ',
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('User acquisition cannot be empty')
      })

      it('should throw an error when userAcquisition is null or undefined', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            null as unknown as string,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('User acquisition cannot be empty')

        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            undefined as unknown as string,
            validStrengths,
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('User acquisition cannot be empty')
      })
    })

    describe('Strengths Property', () => {
      it('should throw an error when strengths is empty array', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            [],
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Strengths cannot be empty')
      })

      it('should throw an error when strengths is null or undefined', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            null as unknown as string[],
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Strengths cannot be empty')

        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            undefined as unknown as string[],
            validWeaknesses,
            validDifferentiationOpportunity
          )
        ).toThrow('Strengths cannot be empty')
      })
    })

    describe('Weaknesses Property', () => {
      it('should throw an error when weaknesses is empty array', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            [],
            validDifferentiationOpportunity
          )
        ).toThrow('Weaknesses cannot be empty')
      })

      it('should throw an error when weaknesses is null or undefined', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            null as unknown as string[],
            validDifferentiationOpportunity
          )
        ).toThrow('Weaknesses cannot be empty')

        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            undefined as unknown as string[],
            validDifferentiationOpportunity
          )
        ).toThrow('Weaknesses cannot be empty')
      })
    })

    describe('DifferentiationOpportunity Property', () => {
      it('should throw an error when differentiationOpportunity is empty', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            ''
          )
        ).toThrow('Differentiation opportunity cannot be empty')
      })

      it('should throw an error when differentiationOpportunity is whitespace', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            '   '
          )
        ).toThrow('Differentiation opportunity cannot be empty')
      })

      it('should throw an error when differentiationOpportunity is null or undefined', () => {
        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            null as unknown as string
          )
        ).toThrow('Differentiation opportunity cannot be empty')

        expect(() =>
          Competitor.New(
            validName,
            validProductName,
            validUrl,
            validCoreFeatures,
            validValueProposition,
            validUserAcquisition,
            validStrengths,
            validWeaknesses,
            undefined as unknown as string
          )
        ).toThrow('Differentiation opportunity cannot be empty')
      })
    })
  })

  describe('Getter Methods', () => {
    let competitor: Competitor

    beforeEach(() => {
      competitor = Competitor.New(
        validName,
        validProductName,
        validUrl,
        validCoreFeatures,
        validValueProposition,
        validUserAcquisition,
        validStrengths,
        validWeaknesses,
        validDifferentiationOpportunity
      )
    })

    it('should return the correct name', () => {
      expect(competitor.getName()).toBe(validName)
    })

    it('should return the correct productName', () => {
      expect(competitor.getProductName()).toBe(validProductName)
    })

    it('should return the correct url', () => {
      expect(competitor.getUrl()).toBe(validUrl)
    })

    it('should return the correct coreFeatures', () => {
      expect(competitor.getCoreFeatures()).toEqual(validCoreFeatures)
    })

    it('should return the correct valueProposition', () => {
      expect(competitor.getValueProposition()).toBe(validValueProposition)
    })

    it('should return the correct userAcquisition', () => {
      expect(competitor.getUserAcquisition()).toBe(validUserAcquisition)
    })

    it('should return the correct strengths', () => {
      expect(competitor.getStrengths()).toEqual(validStrengths)
    })

    it('should return the correct weaknesses', () => {
      expect(competitor.getWeaknesses()).toEqual(validWeaknesses)
    })

    it('should return the correct differentiationOpportunity', () => {
      expect(competitor.getDifferentiationOpportunity()).toBe(
        validDifferentiationOpportunity
      )
    })
  })

  describe('Array Mutability', () => {
    let competitor: Competitor

    beforeEach(() => {
      competitor = Competitor.New(
        validName,
        validProductName,
        validUrl,
        validCoreFeatures,
        validValueProposition,
        validUserAcquisition,
        validStrengths,
        validWeaknesses,
        validDifferentiationOpportunity
      )
    })

    it('should not affect internal coreFeatures when modifying the returned array', () => {
      const coreFeatures = competitor.getCoreFeatures()
      coreFeatures.push('New Feature')

      expect(competitor.getCoreFeatures()).toEqual(validCoreFeatures)
    })

    it('should not affect internal strengths when modifying the returned array', () => {
      const strengths = competitor.getStrengths()
      strengths.push('New Strength')

      expect(competitor.getStrengths()).toEqual(validStrengths)
    })

    it('should not affect internal weaknesses when modifying the returned array', () => {
      const weaknesses = competitor.getWeaknesses()
      weaknesses.push('New Weakness')

      expect(competitor.getWeaknesses()).toEqual(validWeaknesses)
    })
  })
})
