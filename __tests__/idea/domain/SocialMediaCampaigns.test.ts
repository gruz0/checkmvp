import { SocialMediaCampaigns } from '@/idea/domain/SocialMediaCampaigns'

describe('SocialMediaCampaigns Class', () => {
  const validShortFormContent = {
    header: 'Exciting News!',
    platform: 'Twitter',
    content: 'We are launching a new product.',
    tips: ['Use hashtags', 'Include images'],
    imagePrompt: 'A picture of our new product',
  }

  const validLongFormContent = {
    header: 'In-depth Analysis',
    platform: 'LinkedIn',
    title: 'The Future of Technology',
    content: 'A detailed article about upcoming tech trends.',
    tips: ['Include statistics', 'Add references'],
    imagePrompt: 'An infographic about tech trends',
  }

  const validVideoContent = {
    header: 'Watch Now',
    platform: 'YouTube',
    title: 'Product Demo',
    script: ['Intro', 'Features', 'Conclusion'],
    tips: ['Keep it under 5 minutes', 'Use captions'],
    imagePrompt: 'Thumbnail of the product',
  }

  describe('Successful Addition', () => {
    let campaigns: SocialMediaCampaigns

    beforeEach(() => {
      campaigns = SocialMediaCampaigns.New()
    })

    it('should add valid ShortFormContent', () => {
      campaigns.addShortFormContent(validShortFormContent)
      expect(campaigns.getShortFormContents()).toEqual([validShortFormContent])
    })

    it('should add valid LongFormContent', () => {
      campaigns.addLongFormContent(validLongFormContent)
      expect(campaigns.getLongFormContents()).toEqual([validLongFormContent])
    })

    it('should add valid VideoContent', () => {
      campaigns.addVideoContent(validVideoContent)
      expect(campaigns.getVideoContents()).toEqual([validVideoContent])
    })
  })

  describe('Validation Errors', () => {
    let campaigns: SocialMediaCampaigns

    beforeEach(() => {
      campaigns = SocialMediaCampaigns.New()
    })

    describe('addShortFormContent', () => {
      it('should throw an error when ShortFormContent is null or undefined', () => {
        expect(() => {
          campaigns.addShortFormContent(null as any)
        }).toThrow('ShortFormContent cannot be null or undefined')

        expect(() => {
          campaigns.addShortFormContent(undefined as any)
        }).toThrow('ShortFormContent cannot be null or undefined')
      })

      it('should throw an error when required string properties are invalid', () => {
        const invalidContent = { ...validShortFormContent, header: '' }
        expect(() => {
          campaigns.addShortFormContent(invalidContent)
        }).toThrow('header cannot be empty')
      })

      it('should throw an error when tips array is invalid', () => {
        const invalidContent = { ...validShortFormContent, tips: [] }
        expect(() => {
          campaigns.addShortFormContent(invalidContent)
        }).toThrow('tips cannot be empty')
      })
    })

    describe('addLongFormContent', () => {
      it('should throw an error when LongFormContent is null or undefined', () => {
        expect(() => {
          campaigns.addLongFormContent(null as any)
        }).toThrow('LongFormContent cannot be null or undefined')

        expect(() => {
          campaigns.addLongFormContent(undefined as any)
        }).toThrow('LongFormContent cannot be null or undefined')
      })

      it('should throw an error when required string properties are invalid', () => {
        const invalidContent = { ...validLongFormContent, title: '   ' }
        expect(() => {
          campaigns.addLongFormContent(invalidContent)
        }).toThrow('title cannot be empty')
      })

      it('should throw an error when tips array contains invalid elements', () => {
        const invalidContent = {
          ...validLongFormContent,
          tips: ['Valid tip', '', null as any],
        }
        expect(() => {
          campaigns.addLongFormContent(invalidContent)
        }).toThrow(/tips at index \d+ must be a non-empty string/)
      })
    })

    describe('addVideoContent', () => {
      it('should throw an error when VideoContent is null or undefined', () => {
        expect(() => {
          campaigns.addVideoContent(null as any)
        }).toThrow('VideoContent cannot be null or undefined')

        expect(() => {
          campaigns.addVideoContent(undefined as any)
        }).toThrow('VideoContent cannot be null or undefined')
      })

      it('should throw an error when script array is invalid', () => {
        const invalidContent = { ...validVideoContent, script: [] }
        expect(() => {
          campaigns.addVideoContent(invalidContent)
        }).toThrow('script cannot be empty')
      })

      it('should throw an error when a required string property is missing', () => {
        const { platform, ...invalidContent } = validVideoContent

        expect(() => {
          campaigns.addVideoContent(invalidContent as any)
        }).toThrow('platform cannot be empty')
      })
    })
  })

  describe('Getter Methods', () => {
    let campaigns: SocialMediaCampaigns

    beforeEach(() => {
      campaigns = SocialMediaCampaigns.New()
      campaigns.addShortFormContent(validShortFormContent)
      campaigns.addLongFormContent(validLongFormContent)
      campaigns.addVideoContent(validVideoContent)
    })

    it('should return the correct shortFormContents', () => {
      expect(campaigns.getShortFormContents()).toEqual([validShortFormContent])
    })

    it('should return the correct longFormContents', () => {
      expect(campaigns.getLongFormContents()).toEqual([validLongFormContent])
    })

    it('should return the correct videoContents', () => {
      expect(campaigns.getVideoContents()).toEqual([validVideoContent])
    })
  })
})
