import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { App } from '@/concept/service/Service'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const newIdeaId = randomUUID()

    await App.Commands.AcceptConcept.handle({
      id: id,
      newIdeaId: newIdeaId,
    })

    return NextResponse.json({ idea_id: newIdeaId }, { status: 201 })
  } catch (error) {
    console.error('Error while transitioning the concept to an idea:', error)

    return NextResponse.json(
      { error: 'Error while transitioning the concept to an idea.' },
      { status: 500 }
    )
  }
}
