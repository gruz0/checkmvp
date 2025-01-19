import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

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

interface Evaluation {
  coreAssumptions: CoreAssumption[]
  twoWeekPlan: DailyPlan[]
  keyMetrics: KeyMetrics
  testingMethods: TestingMethod[]
  contingencyPlans: ContingencyPlan[]
  resourceOptimization: ResourceOptimization
  softLaunchStrategy: {
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
    platformSpecific: {
      platform: string
      contentFormat: string
      bestTiming: string
      communityRules: string[]
      engagementStrategy: string
    }[]
  }
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

const ResponseSchema = z.object({
  testing_plan: z.object({
    core_assumptions: z.array(
      z.object({
        assumption: z.string(),
        why_critical: z.string(),
        validation_method: z.string(),
      })
    ),
    two_week_plan: z.array(
      z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string()),
        success_metrics: z.array(z.string()),
        tools_needed: z.array(z.string()),
        estimated_time: z.string(),
      })
    ),
    key_metrics: z.object({
      qualitative: z.array(z.string()),
      quantitative: z.array(z.string()),
      minimum_success_criteria: z.array(z.string()),
    }),
    testing_methods: z.array(
      z.object({
        method: z.string(),
        description: z.string(),
        when_to_use: z.string(),
        expected_outcome: z.string(),
      })
    ),
    contingency_plans: z.array(
      z.object({
        scenario: z.string(),
        solution: z.string(),
        alternative_approach: z.string(),
      })
    ),
    resource_optimization: z.object({
      minimum_budget: z.string(),
      time_saving_tips: z.array(z.string()),
      free_tools: z.array(z.string()),
      paid_alternatives: z.array(z.string()),
    }),
    soft_launch_strategy: z.object({
      platforms: z.array(z.string()),
      preparation_steps: z.array(z.string()),
      timing: z.string(),
      engagement_tactics: z.array(z.string()),
      content_templates: z.object({
        titles: z.array(z.string()),
        short_description: z.string(),
        problem_statement: z.string(),
        solution_preview: z.string(),
        call_to_action: z.object({
          primary: z.string(),
          secondary: z.string(),
          value_hook: z.string(),
        }),
        key_benefits: z.array(z.string()),
        social_proof_plan: z.array(z.string()),
        engagement_hooks: z.array(z.string()),
      }),
      platform_specific: z.array(
        z.object({
          platform: z.string(),
          content_format: z.string(),
          best_timing: z.string(),
          community_rules: z.array(z.string()),
          engagement_strategy: z.string(),
        })
      ),
    }),
  }),
})

export class TestingPlanEvaluator {
  static className = 'TestingPlanEvaluator'
  static prompt = '00-testing-plan-generator'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 4000 // Increased due to comprehensive response

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateTestingPlan(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', TestingPlanEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(TestingPlanEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${TestingPlanEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: TestingPlanEvaluator.model,
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: promptContent.trim(),
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Here is the problem my product aims to solve: """
${problem.trim()}"""

Here are my segments: """
${targetAudiences
  .map((targetAudience, idx) => {
    let content = ''

    content += `Segment ${idx + 1}: ${targetAudience.segment}\n`
    content += `Description: ${targetAudience.description}\n`
    content += `Challenges:\n${targetAudience.challenges.join('; ')}\n\n`

    return content
  })
  .join('\n\n')}
"""

And here is my value proposition:
- Main benefit: ${valueProposition.mainBenefit}
- Problem solving: ${valueProposition.problemSolving}
- Differentiation: ${valueProposition.differentiation}`,
              },
            ],
          },
        ],
        top_p: TestingPlanEvaluator.nucleusSampling,
        max_completion_tokens: TestingPlanEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'testing_plan'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${TestingPlanEvaluator.className} called`,
        data: {
          model: TestingPlanEvaluator.model,
          top_p: TestingPlanEvaluator.nucleusSampling,
          max_completion_tokens: TestingPlanEvaluator.maxCompletionTokens,
          usage: response.usage,
          choices: response.choices.length,
        },
        level: 'info',
      })

      const message = response.choices[0].message

      if (message.refusal) {
        // TODO: Handle refusal
        throw new Error('Message refusal: ' + message.refusal)
      }

      if (!message.parsed) {
        // TODO: Add Sentry message context
        throw new Error('Message was not parsed')
      }

      const testingPlan = message.parsed.testing_plan

      return {
        coreAssumptions: testingPlan.core_assumptions.map((assumption) => ({
          assumption: assumption.assumption,
          whyCritical: assumption.why_critical,
          validationMethod: assumption.validation_method,
        })),
        twoWeekPlan: testingPlan.two_week_plan.map((plan) => ({
          day: plan.day,
          focus: plan.focus,
          tasks: plan.tasks,
          successMetrics: plan.success_metrics,
          toolsNeeded: plan.tools_needed,
          estimatedTime: plan.estimated_time,
        })),
        keyMetrics: {
          qualitative: testingPlan.key_metrics.qualitative,
          quantitative: testingPlan.key_metrics.quantitative,
          minimumSuccessCriteria:
            testingPlan.key_metrics.minimum_success_criteria,
        },
        testingMethods: testingPlan.testing_methods.map((method) => ({
          method: method.method,
          description: method.description,
          whenToUse: method.when_to_use,
          expectedOutcome: method.expected_outcome,
        })),
        contingencyPlans: testingPlan.contingency_plans.map((plan) => ({
          scenario: plan.scenario,
          solution: plan.solution,
          alternativeApproach: plan.alternative_approach,
        })),
        resourceOptimization: {
          minimumBudget: testingPlan.resource_optimization.minimum_budget,
          timeSavingTips: testingPlan.resource_optimization.time_saving_tips,
          freeTools: testingPlan.resource_optimization.free_tools,
          paidAlternatives: testingPlan.resource_optimization.paid_alternatives,
        },
        softLaunchStrategy: {
          platforms: testingPlan.soft_launch_strategy.platforms,
          preparationSteps: testingPlan.soft_launch_strategy.preparation_steps,
          timing: testingPlan.soft_launch_strategy.timing,
          engagementTactics:
            testingPlan.soft_launch_strategy.engagement_tactics,
          contentTemplates: {
            titles: testingPlan.soft_launch_strategy.content_templates.titles,
            shortDescription:
              testingPlan.soft_launch_strategy.content_templates
                .short_description,
            problemStatement:
              testingPlan.soft_launch_strategy.content_templates
                .problem_statement,
            solutionPreview:
              testingPlan.soft_launch_strategy.content_templates
                .solution_preview,
            callToAction: {
              primary:
                testingPlan.soft_launch_strategy.content_templates
                  .call_to_action.primary,
              secondary:
                testingPlan.soft_launch_strategy.content_templates
                  .call_to_action.secondary,
              valueHook:
                testingPlan.soft_launch_strategy.content_templates
                  .call_to_action.value_hook,
            },
            keyBenefits:
              testingPlan.soft_launch_strategy.content_templates.key_benefits,
            socialProofPlan:
              testingPlan.soft_launch_strategy.content_templates
                .social_proof_plan,
            engagementHooks:
              testingPlan.soft_launch_strategy.content_templates
                .engagement_hooks,
          },
          platformSpecific:
            testingPlan.soft_launch_strategy.platform_specific.map(
              (platform) => ({
                platform: platform.platform,
                contentFormat: platform.content_format,
                bestTiming: platform.best_timing,
                communityRules: platform.community_rules,
                engagementStrategy: platform.engagement_strategy,
              })
            ),
        },
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
