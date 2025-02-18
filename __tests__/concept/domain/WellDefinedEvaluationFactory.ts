import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation } from '@/concept/domain/Evaluation'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'

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
        TargetAudience.New(
          'id-1',
          'Remote Technology Companies',
          'Software companies with 50+ distributed team members',
          [
            'Information fragmentation across tools',
            'Reduced productivity from context switching',
            'Difficulty maintaining consistent documentation',
          ],
          'Why',
          ['Pain point 1', 'Pain point 2'],
          'Targeting strategy',
          'We believe that remote teams spend 45+ minutes daily searching for documents across different platforms',
          [
            'Remote teams spend 45+ minutes daily searching for documents across different platforms',
            'Current collaboration tools create information silos',
            'Context switching between apps reduces productivity by 40%',
          ],
          ValidationMetrics.New('2.3M companies globally', 8, 9, 7)
        ),
        TargetAudience.New(
          'id-2',
          'Digital Agencies',
          'Creative agencies with multiple client projects',
          [
            'Project asset management across clients',
            'Team collaboration across time zones',
          ],
          'Why',
          ['Pain point 1'],
          'Targeting strategy',
          'We believe that all companies face the same documentation challenges',
          [
            'All companies face the same documentation challenges',
            'Teams will switch completely from existing tools',
            'One solution fits all company sizes',
            'Integration with all platforms is equally important',
          ],
          ValidationMetrics.New('850K agencies worldwide', 7, 8, 9)
        ),
      ],
      ClarityScore.New(9, {
        problemClarity: 10,
        targetAudienceClarity: 8,
        scopeDefinition: 7,
        valuePropositionClarity: 10,
      }),
      LanguageAnalysis.New([], [], [])
    )
  }
}
