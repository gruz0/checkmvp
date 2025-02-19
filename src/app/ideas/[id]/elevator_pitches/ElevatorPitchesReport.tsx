import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { NavBar } from '../components/NavBar'
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
  <div className="p-4 md:p-6 lg:p-8">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
        <NavBar ideaId={ideaId} />
      </aside>

      <div className="flex-1 md:pl-8">
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
      </div>
    </div>

    <BackToTopButton />
  </div>
)
