import * as Sentry from '@sentry/nextjs'
import { notFound } from 'next/navigation'
import React from 'react'
import { App } from '@/idea/service/Service'

import { TargetAudienceReport } from './TargetAudienceReport'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const dto = await App.Queries.GetIdea.handle({
      id: params.id,
    })

    return <TargetAudienceReport targetAudience={dto.targetAudience} />
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
