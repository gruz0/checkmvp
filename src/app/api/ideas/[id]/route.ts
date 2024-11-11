import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { App } from '@/idea/service/Service'

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await App.Commands.Archive.handle({ ideaId: params.id })

    return NextResponse.json(
      { success: true, message: 'Idea has been archived' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error while archiving the idea:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while archiving the idea' },
      { status: 500 }
    )
  }
}
