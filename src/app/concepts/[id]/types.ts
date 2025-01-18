type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface TargetAudience {
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
