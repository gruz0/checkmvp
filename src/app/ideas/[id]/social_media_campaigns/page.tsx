import { notFound } from 'next/navigation'
import React from 'react'
import { App } from '@/idea/service/Service'
import { SocialMediaCampaigns } from './SocialMediaCampaigns'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const dto = await App.Queries.GetSocialMediaCampaigns.handle({
      id: params.id,
    })

    return <SocialMediaCampaigns data={dto} />
  } catch (e) {
    if (e instanceof Error) {
      if ('isNotFoundError' in e) {
        notFound()
      }

      return <p className="p-6 text-lg">{e.message}</p>
    }

    return <p className="p-6 text-lg">An unexpected error occurred</p>
  }
}
