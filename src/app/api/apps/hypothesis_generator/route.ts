import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { HypothesisGenerator } from '@/ai/HypothesisGenerator'
import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'

const hypothesisSchema = z.object({
  content: z
    .string()
    .min(20, 'Content must be at least 20 characters')
    .max(1000, 'Content must be less than 1000 characters'),
})

export async function POST(request: Request) {
  Sentry.setTag('component', 'HTTP API')

  try {
    const formData = await request.json()

    const result = hypothesisSchema.safeParse(formData)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 422 }
      )
    }

    const { content } = result.data

    Sentry.setContext('payload', {
      content: content,
    })

    // Create a new hypothesis record
    const hypothesis = await prisma.generatedHypothesis.create({
      data: {
        content,
        status: 'pending',
      },
    })

    // Start async processing
    processHypothesis(hypothesis.id, content).catch((error) => {
      console.error('Background processing failed:', error)
      Sentry.captureException(error)
    })

    return NextResponse.json({ id: hypothesis.id }, { status: 201 })
  } catch (error) {
    console.error('Error while creating hypothesis:', error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: 'Error while creating hypothesis.' },
      { status: 500 }
    )
  }
}

async function processHypothesis(id: string, content: string) {
  const hypothesisGenerator = new HypothesisGenerator(env.OPENAI_API_KEY)

  try {
    await prisma.generatedHypothesis.update({
      where: { id },
      data: { startedAt: new Date() },
    })

    const result = await hypothesisGenerator.generate(content)

    await prisma.generatedHypothesis.update({
      where: { id },
      data: {
        result: JSON.stringify(result),
        status: 'completed',
        endedAt: new Date(),
      },
    })
  } catch (error) {
    await prisma.generatedHypothesis.update({
      where: { id },
      data: {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        endedAt: new Date(),
      },
    })
    throw error
  }
}
