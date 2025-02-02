import { Evaluation } from '@/concept/domain/Evaluation'

export class WellDefinedEvaluationFactory {
  public static New(): Evaluation {
    return Evaluation.New(
      'well-defined',
      [],
      [],
      [
        'Remote workers spend 45+ minutes daily searching for documents across different platforms',
        'Current collaboration tools create information silos',
        'Context switching between apps reduces productivity by 40%',
      ],
      'Existing solutions like Dropbox and Google Drive lack unified search capabilities across platforms',
      [
        {
          segment: 'Remote Technology Companies',
          description: 'Software companies with 50+ distributed team members',
          challenges: [
            'Information fragmentation across tools',
            'Reduced productivity from context switching',
            'Difficulty maintaining consistent documentation',
          ],
          validationMetrics: {
            marketSize: '2.3M companies globally',
            accessibility: 8,
            painPointIntensity: 9,
            willingnessToPay: 7,
          },
        },
        {
          segment: 'Digital Agencies',
          description: 'Creative agencies with multiple client projects',
          challenges: [
            'Project asset management across clients',
            'Team collaboration across time zones',
          ],
          validationMetrics: {
            marketSize: '850K agencies worldwide',
            accessibility: 7,
            painPointIntensity: 8,
            willingnessToPay: 9,
          },
        },
      ],
      {
        overallScore: 9,
        metrics: {
          problemClarity: 10,
          targetAudienceClarity: 8,
          scopeDefinition: 7,
          valuePropositionClarity: 10,
        },
      },
      {
        vagueTerms: [],
        missingContext: [],
        ambiguousStatements: [],
      }
    )
  }
}
