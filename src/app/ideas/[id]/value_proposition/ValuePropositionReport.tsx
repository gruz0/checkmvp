import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { MainContainer } from '../components/MainContainer'
import SectionDifferentiation from './SectionDifferentiation'
import SectionHowToPitch from './SectionHowToPitch'

interface Props {
  ideaId: string
  valueProposition: {
    mainBenefit: string
    problemSolving: string
    differentiation: string
  }
}

export const ValuePropositionReport = ({ ideaId, valueProposition }: Props) => (
  <MainContainer ideaId={ideaId} activePath="value_proposition" reportIsReady>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
        💎 Value Proposition
      </h1>
    </div>

    <Paragraph>
      The value proposition explains what makes your product special. Here, we
      define the main benefits it provides to users and how it effectively
      solves their problems. A clear value proposition helps you articulate why
      someone should choose your product over others.
    </Paragraph>

    <HorizontalLine />

    <SectionHowToPitch
      mainBenefit={valueProposition.mainBenefit}
      problemSolving={valueProposition.problemSolving}
    />

    <HorizontalLine />

    <SectionDifferentiation
      differentiation={valueProposition.differentiation}
    />

    <HorizontalLine />
  </MainContainer>
)
