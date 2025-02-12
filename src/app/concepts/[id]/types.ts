type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

export interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
  validationMetrics: {
    marketSize: string
    accessibility: number
    painPointIntensity: number
    willingnessToPay: number
  }
}

interface ClarityScore {
  overallScore: number
  metrics: {
    problemClarity: number
    targetAudienceClarity: number
    scopeDefinition: number
    valuePropositionClarity: number
  }
}

interface LanguageAnalysis {
  vagueTerms: string[]
  missingContext: string[]
  ambiguousStatements: string[]
}

interface AssumptionsAnalysis {
  coreAssumptions: string[]
  testability: number
  riskLevel: string
  validationMethods: string[]
}

interface HypothesisFramework {
  statement: string
  hypotheses: string[]
}

interface ValidationPlan {
  quickWins: string[]
  mediumEffort: string[]
  deepDive: string[]
  successCriteria: string[]
}

// FIXME: Create a base evaluation type that can be used for all evaluations
// Then extend it for each specific evaluation type
export interface ProblemEvaluation {
  status: Status
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
  clarityScore: ClarityScore
  languageAnalysis: LanguageAnalysis
  assumptionsAnalysis: AssumptionsAnalysis | null
  hypothesisFramework: HypothesisFramework | null
  validationPlan: ValidationPlan | null
}
