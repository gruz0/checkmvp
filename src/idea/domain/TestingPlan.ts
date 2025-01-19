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

export class TestingPlan {
  private constructor(
    private readonly coreAssumptions: CoreAssumption[],
    private readonly twoWeekPlan: DailyPlan[],
    private readonly keyMetrics: KeyMetrics,
    private readonly testingMethods: TestingMethod[],
    private readonly contingencyPlans: ContingencyPlan[],
    private readonly resourceOptimization: ResourceOptimization,
    private readonly softLaunchStrategy: SoftLaunchStrategy
  ) {}

  static New(
    coreAssumptions: CoreAssumption[],
    twoWeekPlan: DailyPlan[],
    keyMetrics: KeyMetrics,
    testingMethods: TestingMethod[],
    contingencyPlans: ContingencyPlan[],
    resourceOptimization: ResourceOptimization,
    softLaunchStrategy: SoftLaunchStrategy
  ): TestingPlan {
    // Validate core assumptions
    if (!Array.isArray(coreAssumptions) || coreAssumptions.length === 0) {
      throw new Error('Core assumptions cannot be empty')
    }

    // Validate two week plan
    if (!Array.isArray(twoWeekPlan) || twoWeekPlan.length !== 14) {
      throw new Error('Two week plan must contain exactly 14 days')
    }

    twoWeekPlan.forEach((plan, index) => {
      if (plan.day !== index + 1) {
        throw new Error(`Day ${index + 1} is out of order`)
      }
      if (!Array.isArray(plan.tasks) || plan.tasks.length === 0) {
        throw new Error(`Day ${plan.day} tasks cannot be empty`)
      }
      if (
        !Array.isArray(plan.successMetrics) ||
        plan.successMetrics.length === 0
      ) {
        throw new Error(`Day ${plan.day} success metrics cannot be empty`)
      }
      if (!Array.isArray(plan.toolsNeeded) || plan.toolsNeeded.length === 0) {
        throw new Error(`Day ${plan.day} tools needed cannot be empty`)
      }
    })

    // Validate key metrics
    if (
      !Array.isArray(keyMetrics.qualitative) ||
      keyMetrics.qualitative.length === 0
    ) {
      throw new Error('Qualitative metrics cannot be empty')
    }
    if (
      !Array.isArray(keyMetrics.quantitative) ||
      keyMetrics.quantitative.length === 0
    ) {
      throw new Error('Quantitative metrics cannot be empty')
    }
    if (
      !Array.isArray(keyMetrics.minimumSuccessCriteria) ||
      keyMetrics.minimumSuccessCriteria.length === 0
    ) {
      throw new Error('Minimum success criteria cannot be empty')
    }

    // Validate testing methods
    if (!Array.isArray(testingMethods) || testingMethods.length === 0) {
      throw new Error('Testing methods cannot be empty')
    }

    // Validate contingency plans
    if (!Array.isArray(contingencyPlans) || contingencyPlans.length === 0) {
      throw new Error('Contingency plans cannot be empty')
    }

    // Validate resource optimization
    if (
      !resourceOptimization.minimumBudget ||
      resourceOptimization.minimumBudget.trim() === ''
    ) {
      throw new Error('Minimum budget cannot be empty')
    }
    if (
      !Array.isArray(resourceOptimization.timeSavingTips) ||
      resourceOptimization.timeSavingTips.length === 0
    ) {
      throw new Error('Time saving tips cannot be empty')
    }
    if (
      !Array.isArray(resourceOptimization.freeTools) ||
      resourceOptimization.freeTools.length === 0
    ) {
      throw new Error('Free tools cannot be empty')
    }

    // Validate soft launch strategy
    if (
      !Array.isArray(softLaunchStrategy.platforms) ||
      softLaunchStrategy.platforms.length === 0
    ) {
      throw new Error('Soft launch platforms cannot be empty')
    }
    if (
      !Array.isArray(softLaunchStrategy.preparationSteps) ||
      softLaunchStrategy.preparationSteps.length === 0
    ) {
      throw new Error('Preparation steps cannot be empty')
    }
    if (!softLaunchStrategy.timing || softLaunchStrategy.timing.trim() === '') {
      throw new Error('Soft launch timing cannot be empty')
    }
    if (
      !Array.isArray(softLaunchStrategy.contentTemplates.titles) ||
      softLaunchStrategy.contentTemplates.titles.length === 0
    ) {
      throw new Error('Content template titles cannot be empty')
    }

    return new TestingPlan(
      coreAssumptions,
      twoWeekPlan,
      keyMetrics,
      testingMethods,
      contingencyPlans,
      resourceOptimization,
      softLaunchStrategy
    )
  }

  public getCoreAssumptions(): CoreAssumption[] {
    return [...this.coreAssumptions]
  }

  public getTwoWeekPlan(): DailyPlan[] {
    return [...this.twoWeekPlan]
  }

  public getKeyMetrics(): KeyMetrics {
    return {
      qualitative: [...this.keyMetrics.qualitative],
      quantitative: [...this.keyMetrics.quantitative],
      minimumSuccessCriteria: [...this.keyMetrics.minimumSuccessCriteria],
    }
  }

  public getTestingMethods(): TestingMethod[] {
    return [...this.testingMethods]
  }

  public getContingencyPlans(): ContingencyPlan[] {
    return [...this.contingencyPlans]
  }

  public getResourceOptimization(): ResourceOptimization {
    return {
      minimumBudget: this.resourceOptimization.minimumBudget,
      timeSavingTips: [...this.resourceOptimization.timeSavingTips],
      freeTools: [...this.resourceOptimization.freeTools],
      paidAlternatives: [...this.resourceOptimization.paidAlternatives],
    }
  }

  public getSoftLaunchStrategy(): SoftLaunchStrategy {
    return {
      platforms: [...this.softLaunchStrategy.platforms],
      preparationSteps: [...this.softLaunchStrategy.preparationSteps],
      timing: this.softLaunchStrategy.timing,
      engagementTactics: [...this.softLaunchStrategy.engagementTactics],
      contentTemplates: {
        ...this.softLaunchStrategy.contentTemplates,
        titles: [...this.softLaunchStrategy.contentTemplates.titles],
        keyBenefits: [...this.softLaunchStrategy.contentTemplates.keyBenefits],
        socialProofPlan: [
          ...this.softLaunchStrategy.contentTemplates.socialProofPlan,
        ],
        engagementHooks: [
          ...this.softLaunchStrategy.contentTemplates.engagementHooks,
        ],
      },
      platformSpecific: this.softLaunchStrategy.platformSpecific.map(
        (platform) => ({
          ...platform,
          communityRules: [...platform.communityRules],
        })
      ),
    }
  }
}
