import { ContentIdea } from '@/idea/domain/ContentIdea'
import { Strategy } from '@/idea/domain/Strategy'

describe('ContentIdea Class', () => {
  const validStrategy = Strategy.New('emailMarketing')
  const validPlatforms = ['Email', 'Newsletter']
  const validIdeas = ['Idea 1', 'Idea 2']
  const validBenefits = ['Benefit 1', 'Benefit 2']

  describe('Successful Creation', () => {
    it('should create a ContentIdea instance with valid inputs', () => {
      const contentIdea = ContentIdea.New(
        validStrategy,
        validPlatforms,
        validIdeas,
        validBenefits
      )
      expect(contentIdea).toBeInstanceOf(ContentIdea)
      expect(contentIdea.getStrategy()).toBe(validStrategy)
      expect(contentIdea.getPlatforms()).toEqual(validPlatforms)
      expect(contentIdea.getIdeas()).toEqual(validIdeas)
      expect(contentIdea.getBenefits()).toEqual(validBenefits)
    })
  })

  describe('Validation Errors', () => {
    describe('Strategy Parameter', () => {
      it('should throw an error when strategy is null', () => {
        expect(() => {
          ContentIdea.New(
            null as unknown as Strategy,
            validPlatforms,
            validIdeas,
            validBenefits
          )
        }).toThrow('Strategy cannot be null or undefined.')
      })

      it('should throw an error when strategy is undefined', () => {
        expect(() => {
          ContentIdea.New(
            undefined as unknown as Strategy,
            validPlatforms,
            validIdeas,
            validBenefits
          )
        }).toThrow('Strategy cannot be null or undefined.')
      })
    })

    describe('Platforms Parameter', () => {
      it('should throw an error when platforms is null or undefined', () => {
        expect(() => {
          ContentIdea.New(
            validStrategy,
            null as unknown as string[],
            validIdeas,
            validBenefits
          )
        }).toThrow('Platforms cannot be empty.')

        expect(() => {
          ContentIdea.New(
            validStrategy,
            undefined as unknown as string[],
            validIdeas,
            validBenefits
          )
        }).toThrow('Platforms cannot be empty.')
      })

      it('should throw an error when platforms is an empty array', () => {
        expect(() => {
          ContentIdea.New(validStrategy, [], validIdeas, validBenefits)
        }).toThrow('Platforms cannot be empty.')
      })

      it('should throw an error when platforms contains invalid elements', () => {
        const invalidPlatforms = ['Valid Platform', '', '   ', null as any]
        expect(() => {
          ContentIdea.New(
            validStrategy,
            invalidPlatforms,
            validIdeas,
            validBenefits
          )
        }).toThrow(/Platform at index \d+ must be a non-empty string./)
      })
    })

    describe('Ideas Parameter', () => {
      it('should throw an error when ideas is null or undefined', () => {
        expect(() => {
          ContentIdea.New(
            validStrategy,
            validPlatforms,
            null as unknown as string[],
            validBenefits
          )
        }).toThrow('Ideas cannot be empty.')

        expect(() => {
          ContentIdea.New(
            validStrategy,
            validPlatforms,
            undefined as unknown as string[],
            validBenefits
          )
        }).toThrow('Ideas cannot be empty.')
      })

      it('should throw an error when ideas is an empty array', () => {
        expect(() => {
          ContentIdea.New(validStrategy, validPlatforms, [], validBenefits)
        }).toThrow('Ideas cannot be empty.')
      })

      it('should throw an error when ideas contains invalid elements', () => {
        const invalidIdeas = ['Valid Idea', '', '   ', null as any]
        expect(() => {
          ContentIdea.New(
            validStrategy,
            validPlatforms,
            invalidIdeas,
            validBenefits
          )
        }).toThrow(/Idea at index \d+ must be a non-empty string./)
      })
    })

    describe('Benefits Parameter', () => {
      it('should throw an error when benefits is null or undefined', () => {
        expect(() => {
          ContentIdea.New(
            validStrategy,
            validPlatforms,
            validIdeas,
            null as unknown as string[]
          )
        }).toThrow('Benefits cannot be empty.')

        expect(() => {
          ContentIdea.New(
            validStrategy,
            validPlatforms,
            validIdeas,
            undefined as unknown as string[]
          )
        }).toThrow('Benefits cannot be empty.')
      })

      it('should throw an error when benefits is an empty array', () => {
        expect(() => {
          ContentIdea.New(validStrategy, validPlatforms, validIdeas, [])
        }).toThrow('Benefits cannot be empty.')
      })

      it('should throw an error when benefits contains invalid elements', () => {
        const invalidBenefits = ['Valid Benefit', '', '   ', null as any]
        expect(() => {
          ContentIdea.New(
            validStrategy,
            validPlatforms,
            validIdeas,
            invalidBenefits
          )
        }).toThrow(/Benefit at index \d+ must be a non-empty string./)
      })
    })
  })

  describe('Getter Methods', () => {
    let contentIdea: ContentIdea

    beforeEach(() => {
      contentIdea = ContentIdea.New(
        validStrategy,
        validPlatforms,
        validIdeas,
        validBenefits
      )
    })

    it('should return the correct strategy', () => {
      expect(contentIdea.getStrategy()).toBe(validStrategy)
    })

    it('should return the correct platforms', () => {
      expect(contentIdea.getPlatforms()).toEqual(validPlatforms)
    })

    it('should return the correct ideas', () => {
      expect(contentIdea.getIdeas()).toEqual(validIdeas)
    })

    it('should return the correct benefits', () => {
      expect(contentIdea.getBenefits()).toEqual(validBenefits)
    })
  })
})
