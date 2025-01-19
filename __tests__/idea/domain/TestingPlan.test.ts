import { TestingPlan } from '@/idea/domain/TestingPlan'

describe('TestingPlan Class', () => {
  const validCoreAssumptions = [
    {
      assumption: 'Users will pay for this service',
      whyCritical: 'Revenue model depends on it',
      validationMethod: 'Survey and interviews',
    },
  ]

  const validTwoWeekPlan = Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    focus: `Day ${i + 1} focus`,
    tasks: ['Task 1', 'Task 2'],
    successMetrics: ['Metric 1', 'Metric 2'],
    toolsNeeded: ['Tool 1', 'Tool 2'],
    estimatedTime: '2 hours',
  }))

  const validKeyMetrics = {
    qualitative: ['User feedback'],
    quantitative: ['Conversion rate'],
    minimumSuccessCriteria: ['50% positive feedback'],
  }

  const validTestingMethods = [
    {
      method: 'A/B Testing',
      description: 'Compare two versions',
      whenToUse: 'For UI changes',
      expectedOutcome: 'Better conversion',
    },
  ]

  const validContingencyPlans = [
    {
      scenario: 'Low adoption',
      solution: 'Increase marketing',
      alternativeApproach: 'Pivot to different market',
    },
  ]

  const validResourceOptimization = {
    minimumBudget: '$1000',
    timeSavingTips: ['Automate testing'],
    freeTools: ['Google Analytics'],
    paidAlternatives: ['Premium tools'],
  }

  const validSoftLaunchStrategy = {
    platforms: ['Web', 'Mobile'],
    preparationSteps: ['Setup analytics'],
    timing: 'Next month',
    engagementTactics: ['Social media'],
    contentTemplates: {
      titles: ['Launch title'],
      shortDescription: 'Short desc',
      problemStatement: 'The problem',
      solutionPreview: 'The solution',
      callToAction: {
        primary: 'Sign up now',
        secondary: 'Learn more',
        valueHook: 'Save time',
      },
      keyBenefits: ['Benefit 1'],
      socialProofPlan: ['Testimonials'],
      engagementHooks: ['Early bird'],
    },
    platformSpecific: [
      {
        platform: 'Web',
        contentFormat: 'Blog post',
        bestTiming: 'Morning',
        communityRules: ['Be respectful'],
        engagementStrategy: 'Daily posts',
      },
    ],
  }

  describe('Successful Creation', () => {
    it('should create a TestingPlan instance with valid inputs', () => {
      const testingPlan = TestingPlan.New(
        validCoreAssumptions,
        validTwoWeekPlan,
        validKeyMetrics,
        validTestingMethods,
        validContingencyPlans,
        validResourceOptimization,
        validSoftLaunchStrategy
      )

      expect(testingPlan).toBeInstanceOf(TestingPlan)
    })
  })

  describe('Validation Errors', () => {
    describe('CoreAssumptions', () => {
      it('should throw error when coreAssumptions is empty', () => {
        expect(() =>
          TestingPlan.New(
            [],
            validTwoWeekPlan,
            validKeyMetrics,
            validTestingMethods,
            validContingencyPlans,
            validResourceOptimization,
            validSoftLaunchStrategy
          )
        ).toThrow('Core assumptions cannot be empty')
      })
    })

    describe('TwoWeekPlan', () => {
      it('should throw error when twoWeekPlan does not have exactly 14 days', () => {
        const invalidPlan = validTwoWeekPlan.slice(0, 13)
        expect(() =>
          TestingPlan.New(
            validCoreAssumptions,
            invalidPlan,
            validKeyMetrics,
            validTestingMethods,
            validContingencyPlans,
            validResourceOptimization,
            validSoftLaunchStrategy
          )
        ).toThrow('Two week plan must contain exactly 14 days')
      })

      it('should throw error when day numbers are out of order', () => {
        const invalidPlan = validTwoWeekPlan.map((day, i) =>
          i === 0 ? { ...day, day: 2 } : i === 1 ? { ...day, day: 1 } : day
        )
        expect(() =>
          TestingPlan.New(
            validCoreAssumptions,
            invalidPlan,
            validKeyMetrics,
            validTestingMethods,
            validContingencyPlans,
            validResourceOptimization,
            validSoftLaunchStrategy
          )
        ).toThrow('Day 1 is out of order')
      })

      it('should throw error when tasks are empty', () => {
        const invalidPlan = validTwoWeekPlan.map((day) => ({
          ...day,
          tasks: day.day === 1 ? [] : day.tasks,
        }))
        expect(() =>
          TestingPlan.New(
            validCoreAssumptions,
            invalidPlan,
            validKeyMetrics,
            validTestingMethods,
            validContingencyPlans,
            validResourceOptimization,
            validSoftLaunchStrategy
          )
        ).toThrow('Day 1 tasks cannot be empty')
      })
    })

    describe('KeyMetrics', () => {
      it('should throw error when qualitative metrics are empty', () => {
        const invalidMetrics = { ...validKeyMetrics, qualitative: [] }
        expect(() =>
          TestingPlan.New(
            validCoreAssumptions,
            validTwoWeekPlan,
            invalidMetrics,
            validTestingMethods,
            validContingencyPlans,
            validResourceOptimization,
            validSoftLaunchStrategy
          )
        ).toThrow('Qualitative metrics cannot be empty')
      })
    })

    describe('SoftLaunchStrategy', () => {
      it('should throw error when platforms are empty', () => {
        const invalidStrategy = {
          ...validSoftLaunchStrategy,
          platforms: [],
        }
        expect(() =>
          TestingPlan.New(
            validCoreAssumptions,
            validTwoWeekPlan,
            validKeyMetrics,
            validTestingMethods,
            validContingencyPlans,
            validResourceOptimization,
            invalidStrategy
          )
        ).toThrow('Soft launch platforms cannot be empty')
      })
    })
  })

  describe('Getter Methods', () => {
    let testingPlan: TestingPlan

    beforeEach(() => {
      testingPlan = TestingPlan.New(
        validCoreAssumptions,
        validTwoWeekPlan,
        validKeyMetrics,
        validTestingMethods,
        validContingencyPlans,
        validResourceOptimization,
        validSoftLaunchStrategy
      )
    })

    it('should return correct coreAssumptions', () => {
      expect(testingPlan.getCoreAssumptions()).toEqual(validCoreAssumptions)
    })

    it('should return correct twoWeekPlan', () => {
      expect(testingPlan.getTwoWeekPlan()).toEqual(validTwoWeekPlan)
    })

    it('should return correct keyMetrics', () => {
      expect(testingPlan.getKeyMetrics()).toEqual(validKeyMetrics)
    })

    it('should return correct testingMethods', () => {
      expect(testingPlan.getTestingMethods()).toEqual(validTestingMethods)
    })

    it('should return correct contingencyPlans', () => {
      expect(testingPlan.getContingencyPlans()).toEqual(validContingencyPlans)
    })

    it('should return correct resourceOptimization', () => {
      expect(testingPlan.getResourceOptimization()).toEqual(
        validResourceOptimization
      )
    })

    it('should return correct softLaunchStrategy', () => {
      expect(testingPlan.getSoftLaunchStrategy()).toEqual(
        validSoftLaunchStrategy
      )
    })
  })

  describe('Immutability', () => {
    let testingPlan: TestingPlan

    beforeEach(() => {
      testingPlan = TestingPlan.New(
        validCoreAssumptions,
        validTwoWeekPlan,
        validKeyMetrics,
        validTestingMethods,
        validContingencyPlans,
        validResourceOptimization,
        validSoftLaunchStrategy
      )
    })

    it('should not allow modification of returned arrays', () => {
      const coreAssumptions = testingPlan.getCoreAssumptions()
      coreAssumptions.push({
        assumption: 'New assumption',
        whyCritical: 'New reason',
        validationMethod: 'New method',
      })
      expect(testingPlan.getCoreAssumptions()).toEqual(validCoreAssumptions)
    })

    it('should not allow modification of nested objects', () => {
      const keyMetrics = testingPlan.getKeyMetrics()
      keyMetrics.qualitative.push('New metric')
      expect(testingPlan.getKeyMetrics()).toEqual(validKeyMetrics)
    })
  })
})
