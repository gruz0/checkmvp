import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
import SectionElevatorPitch from './SectionElevatorPitch'

interface Props {
  ideaId: string
  elevatorPitches: Array<{
    hook: string
    problem: string
    solution: string
    valueProposition: string
    cta: string
  }>
}

export const ElevatorPitchesReport = ({ ideaId, elevatorPitches }: Props) => (
  <MainContainer ideaId={ideaId} activePath="elevator_pitches" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        🎤 Elevator Pitches
      </h1>
    </div>

    <Paragraph>
      An elevator pitch is a brief summary of your idea that you can deliver
      quickly and effectively. This section helps you craft a compelling and
      concise way to explain your product to others, which can be especially
      useful when networking or seeking feedback.
    </Paragraph>

    <HorizontalLine />

    {elevatorPitches.map((pitch, idx) => (
      <React.Fragment key={idx}>
        <SectionElevatorPitch key={idx} id={idx + 1} {...pitch} />
        <HorizontalLine />
      </React.Fragment>
    ))}
  </MainContainer>
)
