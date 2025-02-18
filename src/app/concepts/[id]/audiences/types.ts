export interface TargetAudience {
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
