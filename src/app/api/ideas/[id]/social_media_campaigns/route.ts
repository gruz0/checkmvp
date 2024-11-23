import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { App } from '@/idea/service/Service'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    await App.Commands.RequestSocialMediaCampaigns.handle({
      ideaId: params.id,
    })

    return NextResponse.json(
      { success: true, message: 'Social media campaigns have been requested' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error while requesting social media campaigns:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while requesting social media campaigns.' },
      { status: 500 }
    )
  }
}
