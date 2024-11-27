import { v4 as uuidv4 } from 'uuid'
import { TargetAudience } from '@/idea/domain/TargetAudience'

describe('TargetAudience Class', () => {
  const validId = uuidv4()
  const validIdeaId = uuidv4()
  const validSegment = 'Developers'
  const validDescription = 'Developers interested in AI tools'
  const validChallenges = ['Time constraints', 'Resource limitations']

  describe('Constructor', () => {
    it('should create a TargetAudience with valid inputs', () => {
      const audience = TargetAudience.New(
        validId,
        validIdeaId,
        validSegment,
        validDescription,
        validChallenges
      )

      expect(audience.getId().getValue()).toBe(validId)
      expect(audience.getIdeaId().getValue()).toBe(validIdeaId)
      expect(audience.getSegment()).toBe(validSegment)
      expect(audience.getDescription()).toBe(validDescription)
      expect(audience.getChallenges()).toEqual(validChallenges)
    })

    it('should throw an error if segment is empty', () => {
      expect(() =>
        TargetAudience.New(
          validId,
          validIdeaId,
          ' ',
          validDescription,
          validChallenges
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
          validChallenges
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
          []
        )
      ).toThrow('Challenges cannot be empty')
    })
  })

  describe('Setters', () => {
    let audience: TargetAudience

    beforeEach(() => {
      audience = TargetAudience.New(
        validId,
        validIdeaId,
        validSegment,
        validDescription,
        validChallenges
      )
    })

    it('should set why with a valid string', () => {
      const why = 'They need tools to improve productivity'
      audience.setWhy(why)
      expect(audience.getWhy()).toBe(why)
    })

    it('should throw an error when setting an empty why', () => {
      expect(() => audience.setWhy(' ')).toThrow('Why cannot be empty')
    })

    it('should set painPoints with a valid array', () => {
      const painPoints = ['Lack of time', 'High costs']
      audience.setPainPoints(painPoints)
      expect(audience.getPainPoints()).toEqual(painPoints)
    })

    it('should throw an error when setting empty painPoints array', () => {
      expect(() => audience.setPainPoints([])).toThrow(
        'Pain points cannot be empty'
      )
    })

    it('should set targetingStrategy with a valid string', () => {
      const strategy = 'Social media marketing'
      audience.setTargetingStrategy(strategy)
      expect(audience.getTargetingStrategy()).toBe(strategy)
    })

    it('should throw an error when setting an empty targetingStrategy', () => {
      expect(() => audience.setTargetingStrategy(' ')).toThrow(
        'Targeting strategy cannot be empty'
      )
    })
  })
})
