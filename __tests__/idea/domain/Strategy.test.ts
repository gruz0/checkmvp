import { Strategy } from '@/idea/domain/Strategy'

describe('Strategy Class', () => {
  const validSections = [
    'socialMediaCampaigns',
    'bloggingAndGuestPosts',
    'emailMarketing',
    'surveysAndPolls',
    'videoContent',
    'infographicsAndVisualContent',
    'communityEngagement',
    'paidAdvertising',
    'webinarsAndLiveStreams',
    'partnershipsAndCollaborations',
  ]

  describe('Successful Creation', () => {
    validSections.forEach((section) => {
      it(`should create a Strategy instance with section '${section}'`, () => {
        const strategy = Strategy.New(section)
        expect(strategy).toBeInstanceOf(Strategy)
        expect(strategy.getName()).toBe(section)
      })
    })
  })

  describe('Validation Errors', () => {
    it('should throw an error when an invalid section name is provided', () => {
      const invalidSection = 'invalidSection'
      expect(() => {
        Strategy.New(invalidSection)
      }).toThrow(`Invalid section name: ${invalidSection}`)
    })

    it('should throw an error when a null or undefined section name is provided', () => {
      expect(() => {
        Strategy.New(null as unknown as string)
      }).toThrow('Invalid section name: null')

      expect(() => {
        Strategy.New(undefined as unknown as string)
      }).toThrow('Invalid section name: undefined')
    })
  })

  describe('Getter Method', () => {
    it('should return the correct section name from getName()', () => {
      const section = 'emailMarketing'
      const strategy = Strategy.New(section)
      expect(strategy.getName()).toBe(section)
    })
  })
})
