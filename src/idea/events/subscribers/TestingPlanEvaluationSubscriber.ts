import * as Sentry from '@sentry/nextjs'

import { Repository } from '@/idea/domain/Repository'
import { TestingPlan } from '@/idea/domain/TestingPlan'
import { ValuePropositionEvaluated } from '@/idea/domain/events/ValuePropositionEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'

interface CoreAssumption {
  assumption: string
  whyCritical: string
  validationMethod: string
}

interface DailyPlan {
  day: number
  focus: string
  tasks: string[]
  successMetrics: string[]
  toolsNeeded: string[]
  estimatedTime: string
}

interface KeyMetrics {
  qualitative: string[]
  quantitative: string[]
  minimumSuccessCriteria: string[]
}

interface TestingMethod {
  method: string
  description: string
  whenToUse: string
  expectedOutcome: string
}

interface ContingencyPlan {
  scenario: string
  solution: string
  alternativeApproach: string
}

interface ResourceOptimization {
  minimumBudget: string
  timeSavingTips: string[]
  freeTools: string[]
  paidAlternatives: string[]
}

interface SoftLaunchStrategy {
  platforms: string[]
  preparationSteps: string[]
  timing: string
  engagementTactics: string[]
  contentTemplates: {
    titles: string[]
    shortDescription: string
    problemStatement: string
    solutionPreview: string
    callToAction: {
      primary: string
      secondary: string
      valueHook: string
    }
    keyBenefits: string[]
    socialProofPlan: string[]
    engagementHooks: string[]
  }
  platformSpecific: Array<{
    platform: string
    contentFormat: string
    bestTiming: string
    communityRules: string[]
    engagementStrategy: string
  }>
}

interface Evaluation {
  coreAssumptions: CoreAssumption[]
  twoWeekPlan: DailyPlan[]
  keyMetrics: KeyMetrics
  testingMethods: TestingMethod[]
  contingencyPlans: ContingencyPlan[]
  resourceOptimization: ResourceOptimization
  softLaunchStrategy: SoftLaunchStrategy
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ValueProposition {
  mainBenefit: string
  problemSolving: string
  differentiation: string
}

interface AIService {
  evaluateTestingPlan(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation>
}

export class TestingPlanEvaluationSubscriber implements EventHandler {
  static className = 'TestingPlanEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return TestingPlanEvaluationSubscriber.className
  }

  async handle(event: ValuePropositionEvaluated): Promise<void> {
    Sentry.setTag('component', 'BackgroundJob')
    Sentry.setTag('job_type', this.getName())
    Sentry.setTag('event_type', event.type)
    Sentry.setTag('idea_id', event.payload.id)

    Sentry.addBreadcrumb({ message: `${this.getName()} started` })

    try {
      const idea = await this.repository.getById(event.payload.id)

      if (!idea) {
        throw new Error(`Unable to get idea by ID: ${event.payload.id}`)
      }

      const audiences = idea.getTargetAudiences().map((targetAudience) => ({
        segment: targetAudience.getSegment(),
        description: targetAudience.getDescription(),
        challenges: targetAudience.getChallenges(),
      }))

      const valueProposition = idea.getValueProposition()

      if (!valueProposition) {
        throw new Error(
          `Idea ${event.payload.id} does not have value proposition`
        )
      }

      const evaluation = await this.aiService.evaluateTestingPlan(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        audiences,
        {
          mainBenefit: valueProposition.getMainBenefit(),
          problemSolving: valueProposition.getProblemSolving(),
          differentiation: valueProposition.getDifferentiation(),
        }
      )

      const testingPlan = TestingPlan.New(
        evaluation.coreAssumptions,
        evaluation.twoWeekPlan,
        evaluation.keyMetrics,
        evaluation.testingMethods,
        evaluation.contingencyPlans,
        evaluation.resourceOptimization,
        evaluation.softLaunchStrategy
      )

      await this.repository.updateIdea(event.payload.id, (idea) => {
        idea.setTestingPlan(testingPlan)
        return idea
      })

      Sentry.addBreadcrumb({
        message: `Testing plan evaluation completed for idea ${event.payload.id}`,
      })
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'testing_plan_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
