import * as Sentry from '@sentry/nextjs'
import { notFound } from 'next/navigation'
import React from 'react'
import { App } from '@/idea/service/Service'

import { MarketAnalysisReport } from './MarketAnalysisReport'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const dto = await App.Queries.GetIdea.handle({
      id: params.id,
    })

    if (!dto.marketAnalysis) {
      notFound()
    }

    return (
      <MarketAnalysisReport
        ideaId={params.id}
        marketAnalysis={dto.marketAnalysis}
      />
    )
  } catch (e) {
    if (e instanceof Error) {
      if ('isNotFoundError' in e) {
        notFound()
      }

      Sentry.captureException(e)

      return <p className="p-6 text-lg">{e.message}</p>
    }

    Sentry.captureException(e)

    return <p className="p-6 text-lg">An unexpected error occurred</p>
  }
}
