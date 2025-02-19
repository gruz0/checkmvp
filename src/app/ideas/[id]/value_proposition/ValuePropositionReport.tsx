import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import { NavBar } from '../components/NavBar'
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
  <div className="p-4 md:p-6 lg:p-8">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
        <NavBar ideaId={ideaId} />
      </aside>

      <div className="flex-1 md:pl-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
            💎 Value Proposition
          </h1>
        </div>

        <Paragraph>
          The value proposition explains what makes your product special. Here,
          we define the main benefits it provides to users and how it
          effectively solves their problems. A clear value proposition helps you
          articulate why someone should choose your product over others.
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
      </div>
    </div>

    <BackToTopButton />
  </div>
)
