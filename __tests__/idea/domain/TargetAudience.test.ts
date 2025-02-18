import { v4 as uuidv4 } from 'uuid'
import { TargetAudience } from '@/idea/domain/TargetAudience'

describe('TargetAudience Class', () => {
  const validId = uuidv4()
  const validIdeaId = uuidv4()
  const validSegment = 'Developers'
  const validDescription = 'Developers interested in AI tools'
  const validChallenges = ['Time constraints', 'Resource limitations']
  const validWhy = 'Developers need tools to improve productivity'
  const validPainPoints = ['Lack of time', 'High costs']
  const validTargetingStrategy = 'Social media marketing'

  describe('Constructor', () => {
    it('should create a TargetAudience with valid inputs', () => {
      const audience = TargetAudience.New(
        validId,
        validIdeaId,
        validSegment,
        validDescription,
        validChallenges,
        validWhy,
        validPainPoints,
        validTargetingStrategy
      )

      expect(audience.getId().getValue()).toBe(validId)
      expect(audience.getIdeaId().getValue()).toBe(validIdeaId)
      expect(audience.getSegment()).toBe(validSegment)
      expect(audience.getDescription()).toBe(validDescription)
      expect(audience.getChallenges()).toEqual(validChallenges)
      expect(audience.getWhy()).toBe(validWhy)
      expect(audience.getPainPoints()).toEqual(validPainPoints)
      expect(audience.getTargetingStrategy()).toBe(validTargetingStrategy)
    })

    it('should throw an error if segment is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          ' ',
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy
        )
      ).toThrow('Segment cannot be empty')
    })

    it('should throw an error if description is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          validSegment,
          ' ',
          validChallenges,
          validWhy,
          validPainPoints,
          validTargetingStrategy
        )
      ).toThrow('Description cannot be empty')
    })

    it('should throw an error if challenges array is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          validSegment,
          validDescription,
          [],
          validWhy,
          validPainPoints,
          validTargetingStrategy
        )
      ).toThrow('Challenges cannot be empty')
    })

    it('should throw an error if challenges array contains empty strings', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          validSegment,
          validDescription,
          ['Challenge 1', '', 'Challenge 2'],
          validWhy,
          validPainPoints,
          validTargetingStrategy
        )
      ).toThrow('Challenges cannot contain empty strings')
    })

    it('should throw an error if why is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          validSegment,
          validDescription,
          validChallenges,
          ' ',
          validPainPoints,
          validTargetingStrategy
        )
      ).toThrow('Why cannot be empty')
    })

    it('should throw an error if pain points array contains empty strings', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          ['Pain Point 1', '', 'Pain Point 2'],
          validTargetingStrategy
        )
      ).toThrow('Pain points cannot contain empty strings')
    })

    it('should throw an error if pain points array is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          [],
          validTargetingStrategy
        )
      ).toThrow('Pain points cannot be empty')
    })

    it('should throw an error if targeting strategy is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          validSegment,
          validDescription,
          validChallenges,
          validWhy,
          validPainPoints,
          ' '
        )
      ).toThrow('Targeting strategy cannot be empty')
    })
  })
})
