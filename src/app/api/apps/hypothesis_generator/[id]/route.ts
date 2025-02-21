import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const hypothesis = await prisma.generatedHypothesis.findUnique({
      where: { id },
    })

    if (!hypothesis) {
      return NextResponse.json(
        { error: 'Hypothesis not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(hypothesis)
  } catch (error) {
    console.error('Error while fetching hypothesis:', error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: 'Error while fetching hypothesis.' },
      { status: 500 }
    )
  }
}
