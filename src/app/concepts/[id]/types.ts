type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface TargetAudience {
  id: string
  segment: string
  description: string
  challenges: string[]
  why: string
  painPoints: string[]
  targetingStrategy: string
  statement: string
  hypotheses: string[]
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
}
