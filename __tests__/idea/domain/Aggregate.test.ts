import { Identity } from '@/common/domain/Identity'
import { Idea } from '@/idea/domain/Aggregate'
import { Competitor } from '@/idea/domain/Competitor'
import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { ContentIdeasForMarketing } from '@/idea/domain/ContentIdeasForMarketing'
import { ContextAnalysis } from '@/idea/domain/ContextAnalysis'
import { ElevatorPitch } from '@/idea/domain/ElevatorPitch'
import { GoogleTrendsKeyword } from '@/idea/domain/GoogleTrendsKeyword'
import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'
import { ProductName } from '@/idea/domain/ProductName'
import { SWOTAnalysis } from '@/idea/domain/SWOTAnalysis'
import { SocialMediaCampaigns } from '@/idea/domain/SocialMediaCampaigns'
import { TargetAudience } from '@/idea/domain/TargetAudience'
import { TestingPlan } from '@/idea/domain/TestingPlan'
import { ValueProposition } from '@/idea/domain/ValueProposition'

describe('Idea Class', () => {
  let validId: string
  let validConceptId: string
  let validProblem: string
  let validMarketExistence: string
  let validRegion: string
  let validProductType: string
  let validStage: string
  let validStatement: string
  let validHypotheses: string
  let validTargetAudience: TargetAudience

  beforeEach(() => {
    validId = Identity.Generate().getValue()
    validConceptId = Identity.Generate().getValue()
    validProblem = 'This is a valid problem statement.'
    validMarketExistence = 'The market exists because...'
    validRegion = 'This is a valid region.'
    validProductType = 'This is a valid product type.'
    validStage = 'This is a valid stage.'
    validStatement = 'This is a valid statement.'
    validHypotheses = 'This is a valid hypotheses.'

    validTargetAudience = TargetAudience.New(
      Identity.Generate().getValue(),
      Identity.Generate().getValue(),
      'Developers',
      'Description',
      ['Challenge 1'],
      'Developers need tools to increase productivity.',
      ['Time-consuming tasks', 'Manual errors'],
      'Offer automation tools.'
    )
  })

  describe('Creation of Idea', () => {
    it('should create an Idea instance with valid inputs', () => {
      const idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      expect(idea).toBeInstanceOf(Idea)
      expect(idea.getId().getValue()).toBe(validId)
      expect(idea.getConceptId().getValue()).toBe(validConceptId)
      expect(idea.getProblem().getValue()).toBe(validProblem)
      expect(idea.getMarketExistence()).toBe(validMarketExistence)
      expect(idea.getTargetAudience()).toEqual(validTargetAudience)
    })
  })

  describe('Validations in Idea.New()', () => {
    it('should throw an error when problem is empty', () => {
      expect(() => {
        Idea.New(
          validId,
          validConceptId,
          ' ',
          validMarketExistence,
          validRegion,
          validProductType,
          validStage,
          validStatement,
          validHypotheses,
          validTargetAudience
        )
      }).toThrow('Problem cannot be empty')
    })

    it('should throw an error when market existence is empty', () => {
      expect(() => {
        Idea.New(
          validId,
          validConceptId,
          validProblem,
          ' ',
          validRegion,
          validProductType,
          validStage,
          validStatement,
          validHypotheses,
          validTargetAudience
        )
      }).toThrow('Market existence cannot be empty')
    })

    it('should throw an error when region is empty', () => {
      expect(() => {
        Idea.New(
          validId,
          validConceptId,
          validProblem,
          validMarketExistence,
          ' ',
          validProductType,
          validStage,
          validStatement,
          validHypotheses,
          validTargetAudience
        )
      }).toThrow('Region cannot be empty')
    })

    it('should throw an error when product type is empty', () => {
      expect(() => {
        Idea.New(
          validId,
          validConceptId,
          validProblem,
          validMarketExistence,
          validRegion,
          ' ',
          validStage,
          validStatement,
          validHypotheses,
          validTargetAudience
        )
      }).toThrow('Product type cannot be empty')
    })

    it('should throw an error when stage is empty', () => {
      expect(() => {
        Idea.New(
          validId,
          validConceptId,
          validProblem,
          validMarketExistence,
          validRegion,
          validProductType,
          ' ',
          validStatement,
          validHypotheses,
          validTargetAudience
        )
      }).toThrow('Stage cannot be empty')
    })

    it('should throw an error when statement is empty', () => {
      expect(() => {
        Idea.New(
          validId,
          validConceptId,
          validProblem,
          validMarketExistence,
          validRegion,
          validProductType,
          validStage,
          ' ',
          validHypotheses,
          validTargetAudience
        )
      }).toThrow('Statement cannot be empty')
    })

    it('should throw an error when hypotheses is empty', () => {
      expect(() => {
        Idea.New(
          validId,
          validConceptId,
          validProblem,
          validMarketExistence,
          validRegion,
          validProductType,
          validStage,
          validStatement,
          ' ',
          validTargetAudience
        )
      }).toThrow('Hypotheses cannot be empty')
    })
  })

  describe('setValueProposition', () => {
    let idea: Idea
    let valueProposition: ValueProposition

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      valueProposition = ValueProposition.New(
        'Saves time',
        'Automates tasks',
        'Unique automation technology'
      )
    })

    it('should set value proposition when not already set', () => {
      idea.setValueProposition(valueProposition)
      expect(idea.getValueProposition()).toBe(valueProposition)
    })

    it('should throw an error when value proposition is already set', () => {
      idea.setValueProposition(valueProposition)
      expect(() => {
        idea.setValueProposition(valueProposition)
      }).toThrow('ValueProposition already set')
    })
  })

  describe('setMarketAnalysis', () => {
    let idea: Idea
    let marketAnalysis: MarketAnalysis

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      marketAnalysis = MarketAnalysis.New(
        'Trends in the market',
        'User behaviors',
        'Market gaps',
        'Innovation opportunities',
        'Strategic direction'
      )
    })

    it('should set market analysis when not already set', () => {
      idea.setMarketAnalysis(marketAnalysis)
      expect(idea.getMarketAnalysis()).toBe(marketAnalysis)
    })

    it('should throw an error when market analysis is already set', () => {
      idea.setMarketAnalysis(marketAnalysis)
      expect(() => {
        idea.setMarketAnalysis(marketAnalysis)
      }).toThrow('MarketAnalysis already set')
    })
  })

  describe('setCompetitorAnalysis', () => {
    let idea: Idea
    let competitorAnalysis: CompetitorAnalysis

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )

      const competitor = Competitor.New(
        'Name',
        'Product Name',
        'https://example.com',
        ['Feature 1'],
        'Value Proposition',
        'User Acquisition',
        ['Strength 1'],
        ['Weakness 1'],
        'Differentiation Opportunity'
      )

      competitorAnalysis = CompetitorAnalysis.New(
        [competitor],
        {
          strengths: ['Our Strengths'],
          weaknesses: ['Our Weaknesses'],
        },
        ['Suggestion 1']
      )
    })

    it('should set competitor analysis when not already set', () => {
      idea.setCompetitorAnalysis(competitorAnalysis)
      expect(idea.getCompetitorAnalysis()).toBe(competitorAnalysis)
    })

    it('should throw an error when competitor analysis is already set', () => {
      idea.setCompetitorAnalysis(competitorAnalysis)
      expect(() => {
        idea.setCompetitorAnalysis(competitorAnalysis)
      }).toThrow('CompetitorAnalysis already set')
    })
  })

  describe('setSWOTAnalysis', () => {
    let idea: Idea
    let swotAnalysis: SWOTAnalysis

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      swotAnalysis = SWOTAnalysis.New(
        ['Strength 1'],
        ['Weakness 1'],
        ['Opportunity 1'],
        ['Threat 1']
      )
    })

    it('should set SWOT analysis when not already set', () => {
      idea.setSWOTAnalysis(swotAnalysis)
      expect(idea.getSWOTAnalysis()).toBe(swotAnalysis)
    })

    it('should throw an error when SWOT analysis is already set', () => {
      idea.setSWOTAnalysis(swotAnalysis)
      expect(() => {
        idea.setSWOTAnalysis(swotAnalysis)
      }).toThrow('SWOTAnalysis already set')
    })
  })

  describe('setContentIdeasForMarketing', () => {
    let idea: Idea
    let contentIdeas: ContentIdeasForMarketing

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      contentIdeas = ContentIdeasForMarketing.New()
      // Assume we have a valid ContentIdea instance to add
      // contentIdeas.addContentIdea(validContentIdea)
    })

    it('should set content ideas for marketing when not already set', () => {
      idea.setContentIdeasForMarketing(contentIdeas)
      expect(idea.getContentIdeasForMarketing()).toBe(contentIdeas)
    })

    it('should throw an error when content ideas for marketing is already set', () => {
      idea.setContentIdeasForMarketing(contentIdeas)
      expect(() => {
        idea.setContentIdeasForMarketing(contentIdeas)
      }).toThrow('ContentIdeasForMarketing already set')
    })
  })

  describe('setSocialMediaCampaigns', () => {
    let idea: Idea
    let socialMediaCampaigns: SocialMediaCampaigns

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      socialMediaCampaigns = SocialMediaCampaigns.New()
      // Assume we have valid content to add to socialMediaCampaigns
    })

    it('should set social media campaigns when not already set', () => {
      idea.setSocialMediaCampaigns(socialMediaCampaigns)
      expect(idea.getSocialMediaCampaigns()).toBe(socialMediaCampaigns)
    })

    it('should throw an error when social media campaigns is already set', () => {
      idea.setSocialMediaCampaigns(socialMediaCampaigns)
      expect(() => {
        idea.setSocialMediaCampaigns(socialMediaCampaigns)
      }).toThrow('SocialMediaCampaigns already set')
    })
  })

  describe('addElevatorPitch', () => {
    let idea: Idea
    let elevatorPitch: ElevatorPitch

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      elevatorPitch = ElevatorPitch.New(
        'This is a hook',
        'This is a problem',
        'This is a solution',
        'This is a value',
        'This is a CTA'
      )
    })

    it('should add an elevator pitch when it does not exist', () => {
      idea.addElevatorPitch(elevatorPitch)
      expect(idea.getElevatorPitches()).toEqual([elevatorPitch])
    })

    it('should throw an error when elevator pitch already exists', () => {
      idea.addElevatorPitch(elevatorPitch)
      expect(() => {
        idea.addElevatorPitch(elevatorPitch)
      }).toThrow('ElevatorPitch already exists')
    })
  })

  describe('addGoogleTrendsKeyword', () => {
    let idea: Idea
    let googleTrendsKeyword: GoogleTrendsKeyword

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      googleTrendsKeyword = GoogleTrendsKeyword.New('Keyword')
    })

    it('should add a Google Trends keyword when it does not exist', () => {
      idea.addGoogleTrendsKeyword(googleTrendsKeyword)
      expect(idea.getGoogleTrendsKeywords()).toEqual([googleTrendsKeyword])
    })

    it('should throw an error when Google Trends keyword already exists', () => {
      idea.addGoogleTrendsKeyword(googleTrendsKeyword)
      expect(() => {
        idea.addGoogleTrendsKeyword(googleTrendsKeyword)
      }).toThrow('GoogleTrendsKeyword already exists')
    })
  })

  describe('addProductName', () => {
    let idea: Idea
    let productName: ProductName

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      productName = ProductName.New(
        'ProductX',
        ['productx.com'],
        'Because it simplifies tasks',
        'Simplify Your Work',
        'Helps users automate processes',
        ['ProductY', 'ProductZ'],
        'Strong branding potential'
      )
    })

    it('should add a product name when it does not exist', () => {
      idea.addProductName(productName)
      expect(idea.getProductNames()).toEqual([productName])
    })

    it('should throw an error when product name already exists', () => {
      idea.addProductName(productName)
      expect(() => {
        idea.addProductName(productName)
      }).toThrow('ProductName already exists')
    })
  })

  describe('finalizeMigration', () => {
    let idea: Idea

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
    })

    it('should finalize migration when not already migrated', () => {
      idea.finalizeMigration()
      expect(idea.isMigrated()).toBeTrue()
    })

    it('should throw an error when already migrated', () => {
      idea.finalizeMigration()
      expect(() => {
        idea.finalizeMigration()
      }).toThrow('Idea was already migrated')
    })
  })

  describe('archive', () => {
    let idea: Idea

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
    })

    it('should archive the idea when not already archived', () => {
      idea.archive()
      expect(idea.isArchived()).toBeTrue()
    })

    it('should throw an error when already archived', () => {
      idea.archive()
      expect(() => {
        idea.archive()
      }).toThrow('Idea was already archived')
    })
  })

  describe('Getter Methods', () => {
    let idea: Idea

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
    })

    it('should return the correct id', () => {
      expect(idea.getId().getValue()).toBe(validId)
    })

    it('should return the correct conceptId', () => {
      expect(idea.getConceptId().getValue()).toBe(validConceptId)
    })

    it('should return the correct problem', () => {
      expect(idea.getProblem().getValue()).toBe(validProblem)
    })

    it('should return the correct marketExistence', () => {
      expect(idea.getMarketExistence()).toBe(validMarketExistence)
    })

    it('should return the correct targetAudience', () => {
      expect(idea.getTargetAudience()).toEqual(validTargetAudience)
    })

    it('should return the correct valueProposition', () => {
      const valueProposition = ValueProposition.New(
        'Saves time',
        'Automates tasks',
        'Unique automation technology'
      )
      idea.setValueProposition(valueProposition)
      expect(idea.getValueProposition()).toBe(valueProposition)
    })

    it('should return the correct marketAnalysis', () => {
      const marketAnalysis = MarketAnalysis.New(
        'Trends in the market',
        'User behaviors',
        'Market gaps',
        'Innovation opportunities',
        'Strategic direction'
      )
      idea.setMarketAnalysis(marketAnalysis)
      expect(idea.getMarketAnalysis()).toBe(marketAnalysis)
    })

    it('should return the correct competitorAnalysis', () => {
      const competitor = Competitor.New(
        'Name',
        'Product Name',
        'https://example.com',
        ['Feature 1'],
        'Value Proposition',
        'User Acquisition',
        ['Strength 1'],
        ['Weakness 1'],
        'Differentiation Opportunity'
      )

      const competitorAnalysis = CompetitorAnalysis.New(
        [competitor],
        {
          strengths: ['Our Strengths'],
          weaknesses: ['Our Weaknesses'],
        },
        ['Suggestion 1']
      )
      idea.setCompetitorAnalysis(competitorAnalysis)
      expect(idea.getCompetitorAnalysis()).toBe(competitorAnalysis)
    })

    it('should return the correct productNames', () => {
      const productName = ProductName.New(
        'ProductX',
        ['productx.com'],
        'Because it simplifies tasks',
        'Simplify Your Work',
        'Helps users automate processes',
        ['ProductY', 'ProductZ'],
        'Strong branding potential'
      )
      idea.addProductName(productName)
      expect(idea.getProductNames()).toEqual([productName])
    })

    it('should return the correct swotAnalysis', () => {
      const swotAnalysis = SWOTAnalysis.New(
        ['Strength 1'],
        ['Weakness 1'],
        ['Opportunity 1'],
        ['Threat 1']
      )
      idea.setSWOTAnalysis(swotAnalysis)
      expect(idea.getSWOTAnalysis()).toBe(swotAnalysis)
    })

    it('should return the correct elevatorPitches', () => {
      const elevatorPitch = ElevatorPitch.New(
        'This is a hook',
        'This is a problem',
        'This is a solution',
        'This is a value',
        'This is a CTA'
      )
      idea.addElevatorPitch(elevatorPitch)
      expect(idea.getElevatorPitches()).toEqual([elevatorPitch])
    })

    it('should return the correct googleTrendsKeywords', () => {
      const googleTrendsKeyword = GoogleTrendsKeyword.New('Keyword')
      idea.addGoogleTrendsKeyword(googleTrendsKeyword)
      expect(idea.getGoogleTrendsKeywords()).toEqual([googleTrendsKeyword])
    })

    it('should return the correct contentIdeasForMarketing', () => {
      const contentIdeas = ContentIdeasForMarketing.New()
      idea.setContentIdeasForMarketing(contentIdeas)
      expect(idea.getContentIdeasForMarketing()).toBe(contentIdeas)
    })

    it('should return the correct socialMediaCampaigns', () => {
      const socialMediaCampaigns = SocialMediaCampaigns.New()
      idea.setSocialMediaCampaigns(socialMediaCampaigns)
      expect(idea.getSocialMediaCampaigns()).toBe(socialMediaCampaigns)
    })

    it('should return the correct migrated status', () => {
      expect(idea.isMigrated()).toBeFalse()
      idea.finalizeMigration()
      expect(idea.isMigrated()).toBeTrue()
    })

    it('should return the correct archived status', () => {
      expect(idea.isArchived()).toBeFalse()
      idea.archive()
      expect(idea.isArchived()).toBeTrue()
    })

    it('should return the correct region', () => {
      expect(idea.getRegion()).toBe(validRegion)
    })

    it('should return the correct productType', () => {
      expect(idea.getProductType()).toBe(validProductType)
    })

    it('should return the correct stage', () => {
      expect(idea.getStage()).toBe(validStage)
    })

    it('should return the correct statement', () => {
      expect(idea.getStatement()).toBe(validStatement)
    })

    it('should return the correct hypotheses', () => {
      expect(idea.getHypotheses()).toBe(validHypotheses)
    })
  })

  describe('setTestingPlan', () => {
    let idea: Idea
    let testingPlan: TestingPlan

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      testingPlan = TestingPlan.New(
        [{ assumption: 'test', whyCritical: 'test', validationMethod: 'test' }],
        Array.from({ length: 14 }, (_, i) => ({
          day: i + 1,
          focus: 'test',
          tasks: ['test'],
          successMetrics: ['test'],
          toolsNeeded: ['test'],
          estimatedTime: 'test',
        })),
        {
          qualitative: ['test'],
          quantitative: ['test'],
          minimumSuccessCriteria: ['test'],
        },
        [
          {
            method: 'test',
            description: 'test',
            whenToUse: 'test',
            expectedOutcome: 'test',
          },
        ],
        [{ scenario: 'test', solution: 'test', alternativeApproach: 'test' }],
        {
          minimumBudget: 'test',
          timeSavingTips: ['test'],
          freeTools: ['test'],
          paidAlternatives: ['test'],
        },
        {
          platforms: ['test'],
          preparationSteps: ['test'],
          timing: 'test',
          engagementTactics: ['test'],
          contentTemplates: {
            titles: ['test'],
            shortDescription: 'test',
            problemStatement: 'test',
            solutionPreview: 'test',
            callToAction: {
              primary: 'test',
              secondary: 'test',
              valueHook: 'test',
            },
            keyBenefits: ['test'],
            socialProofPlan: ['test'],
            engagementHooks: ['test'],
          },
          platformSpecific: [
            {
              platform: 'test',
              contentFormat: 'test',
              bestTiming: 'test',
              communityRules: ['test'],
              engagementStrategy: 'test',
            },
          ],
        }
      )
    })

    it('should set testing plan when not already set', () => {
      idea.setTestingPlan(testingPlan)
      expect(idea.getTestingPlan()).toBe(testingPlan)
    })

    it('should throw error when testing plan is already set', () => {
      idea.setTestingPlan(testingPlan)
      expect(() => idea.setTestingPlan(testingPlan)).toThrow(
        'TestingPlan already set'
      )
    })
  })

  describe('setContextAnalysis', () => {
    let idea: Idea
    let contextAnalysis: ContextAnalysis

    beforeEach(() => {
      idea = Idea.New(
        validId,
        validConceptId,
        validProblem,
        validMarketExistence,
        validRegion,
        validProductType,
        validStage,
        validStatement,
        validHypotheses,
        validTargetAudience
      )
      contextAnalysis = ContextAnalysis.New(
        'Clear problem definition',
        ['Market exists in region A', 'Growing demand'],
        ['Existing solution A', 'Existing solution B'],
        ['Challenge 1', 'Challenge 2'],
        'Software developers aged 25-40',
        'This matters because it solves critical pain points',
        ['Opportunity 1', 'Opportunity 2'],
        ['Sign up now', 'Learn more'],
        [
          {
            label: 'Market Size',
            value: '$1B',
            change: '+20%',
            trend: 'up',
          },
        ],
        [
          {
            action: 'Launch MVP',
            impact: 8,
            effort: 6,
            impactDescription: 'High market penetration',
            effortDescription: 'Requires significant development',
          },
        ]
      )
    })

    it('should set context analysis when not already set', () => {
      idea.setContextAnalysis(contextAnalysis)
      expect(idea.getContextAnalysis()).toBe(contextAnalysis)
    })

    it('should throw an error when context analysis is already set', () => {
      idea.setContextAnalysis(contextAnalysis)
      expect(() => {
        idea.setContextAnalysis(contextAnalysis)
      }).toThrow('ContextAnalysis already set')
    })
  })
})
