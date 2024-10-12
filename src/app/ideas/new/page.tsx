import React from 'react'
import NewIdeaForm from '@/components/NewIdeaForm'

const NewIdeaPage = () => (
  <div className="mx-auto max-w-6xl p-8">
    <h1 className="mb-6 text-4xl font-bold">
      Validate Your Product Idea Quickly
    </h1>

    <p className="mb-2 text-xl">
      Answer first two key questions to start and we&apos;ll help you understand
      if your idea solves a real problem and whether your target audience is
      well-defined. If you&apos;re having trouble answering these questions,
      don&apos;t worry! Just give us your best guess, and we&apos;ll help refine
      it in the next step.
    </p>

    <hr className="my-8" />

    <NewIdeaForm />
  </div>
)

export default NewIdeaPage
