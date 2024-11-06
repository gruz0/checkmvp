import React from 'react'
import { App } from '@/idea/service/Service'
import { IdeaAnalysisReport } from './IdeaAnalysisReport'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const dto = await App.Queries.GetIdea.handle({
      id: params.id,
    })

    return <IdeaAnalysisReport data={dto} />
  } catch (e) {
    // FIXME: Add more fancy errors handling.
    // Also don't forget to catch real errors and app layer errors.

    return <p>{(e as Error).message}</p>
  }
}
