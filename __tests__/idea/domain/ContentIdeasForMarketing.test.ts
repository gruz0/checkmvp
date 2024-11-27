import { ContentIdea } from '@/idea/domain/ContentIdea'
import { ContentIdeasForMarketing } from '@/idea/domain/ContentIdeasForMarketing'
import { Strategy } from '@/idea/domain/Strategy'

describe('ContentIdeasForMarketing Class', () => {
  const validStrategy = Strategy.New('emailMarketing')
  const validPlatforms = ['Email', 'Newsletter']
  const validIdeas = ['Idea 1', 'Idea 2']
  const validBenefits = ['Benefit 1', 'Benefit 2']

  const validContentIdea = ContentIdea.New(
    validStrategy,
    validPlatforms,
    validIdeas,
    validBenefits
  )

  describe('Successful Addition', () => {
    let contentIdeasForMarketing: ContentIdeasForMarketing

    beforeEach(() => {
      contentIdeasForMarketing = ContentIdeasForMarketing.New()
    })

    it('should add a valid ContentIdea', () => {
      contentIdeasForMarketing.addContentIdea(validContentIdea)
      expect(contentIdeasForMarketing.getContentIdeas()).toEqual([
        validContentIdea,
      ])
    })
  })

  describe('Validation Errors', () => {
    let contentIdeasForMarketing: ContentIdeasForMarketing

    beforeEach(() => {
      contentIdeasForMarketing = ContentIdeasForMarketing.New()
    })

    it('should throw an error when adding a null ContentIdea', () => {
      expect(() => {
        contentIdeasForMarketing.addContentIdea(null as unknown as ContentIdea)
      }).toThrow('ContentIdea cannot be null or undefined')
    })

    it('should throw an error when adding an undefined ContentIdea', () => {
      expect(() => {
        contentIdeasForMarketing.addContentIdea(
          undefined as unknown as ContentIdea
        )
      }).toThrow('ContentIdea cannot be null or undefined')
    })

    it('should throw an error when adding an invalid ContentIdea instance', () => {
      const invalidContentIdea = {
        strategy: 'emailMarketing', // Should be a Strategy instance
        platforms: validPlatforms,
        ideas: validIdeas,
        benefits: validBenefits,
      }
      expect(() => {
        contentIdeasForMarketing.addContentIdea(
          invalidContentIdea as unknown as ContentIdea
        )
      }).toThrow('Invalid ContentIdea instance')
    })
  })

  describe('Getter Method', () => {
    let contentIdeasForMarketing: ContentIdeasForMarketing

    beforeEach(() => {
      contentIdeasForMarketing = ContentIdeasForMarketing.New()
      contentIdeasForMarketing.addContentIdea(validContentIdea)
    })

    it('should return the correct contentIdeas array', () => {
      expect(contentIdeasForMarketing.getContentIdeas()).toEqual([
        validContentIdea,
      ])
    })

    it('should return a copy of the contentIdeas array', () => {
      const contentIdeas = contentIdeasForMarketing.getContentIdeas()
      contentIdeas.push(validContentIdea) // Modify the returned array
      expect(contentIdeasForMarketing.getContentIdeas()).toEqual([
        validContentIdea,
      ]) // Original array should not be affected
    })
  })
})
