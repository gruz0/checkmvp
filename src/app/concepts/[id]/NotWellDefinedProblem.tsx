'use client'
import React from 'react'
import ConceptForm from '@/components/ConceptForm'
import Paragraph from '@/components/Paragraph'
import Section from '@/components/Section'

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ProblemEvaluation {
  status: 'well-defined' | 'requires_changes' | 'not-well-defined'
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
}

interface Props {
  problem: string
  evaluation: ProblemEvaluation
}

const NotWellDefinedProblem = ({ problem, evaluation }: Props) => (
  <div>
    <Section header="Oops! We Need a Bit More Information 🤔">
      <Paragraph>
        It seems that the problem you&apos;ve shared is a bit too unclear for us
        to analyze the market effectively.
      </Paragraph>

      <Paragraph>
        To provide you with the best insights, could you please give us more
        details about the specific challenges your product aims to solve? The
        clearer you can be about the problem, the better we can assist you in
        understanding the potential market for your idea. Feel free to give it
        another shot in the form below!
      </Paragraph>
    </Section>

    <Section header="This Is How You Can Improve Your Problem Statement:">
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {evaluation.suggestions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 md:px-6 md:text-lg dark:bg-gray-900"
          >
            {item}
          </div>
        ))}
      </div>
    </Section>

    <hr className="my-6 md:my-8" />

    <ConceptForm problem={problem} />
  </div>
)

export default NotWellDefinedProblem
