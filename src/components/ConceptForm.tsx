'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import SectionHeader from '@/components/SectionHeader'
import SectionWrapper from '@/components/SectionWrapper'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface Props {
  problem: string
  persona: string
  region: string
  productType: string
  stage: string
  cta?: string
}

const examples = [
  {
    title: 'Automated Code Review & QA',
    primaryAssumption:
      'Development teams at mid-size software firms will embrace an automated code review solution if they trust it to reduce manual effort and catch critical bugs early.',
    targetPersonas: [
      'Full-Stack Developers: Constantly switching between front-end and back-end tasks; they need quick feedback to avoid context switching.',
      'Tech Leads and QA Managers: Responsible for overall code quality; they want to streamline the review process without losing accuracy.',
    ],
  },
  {
    title: 'AI-Powered Helpdesk Platform',
    primaryAssumption:
      'Organizations with busy customer support channels will adopt an AI-driven helpdesk if they expect it to shorten response times and reduce repetitive inquiries.',
    targetPersonas: [
      'Customer Support Managers: Overwhelmed by ticket backlogs and eager to improve resolution rates.',
      'Small IT Teams: Handling all technical support in-house, often struggling with limited time and resources.',
    ],
  },
]

const businessTypeInfo = [
  {
    id: 'b2b',
    title: 'B2B (Business-to-Business)',
    description:
      'You sell your product or service to other businesses, rather than individual consumers. Examples include accounting software for small businesses or email marketing platforms like Mailchimp.',
    details: [
      'Longer sales cycles with multiple decision-makers',
      'Requires interviewing decision-makers and budget holders',
      'Higher prices with subscription/licensing models',
    ],
  },
  {
    id: 'b2c',
    title: 'B2C (Business-to-Consumer)',
    description:
      'You sell directly to individual consumers—think typical apps or web services used by the public, like Netflix or Duolingo.',
    details: [
      'Shorter, simpler buying process',
      'Focus on user testing and UX',
      'Lower price points, aiming for large user base',
    ],
  },
  {
    id: 'b2b2c',
    title: 'B2B2C (Business-to-Business-to-Consumer)',
    description:
      "You sell to businesses, but your end users are consumers. Your product integrates into a business's offering, which they provide to their consumers.",
    details: [
      'Must appeal to both business buyers and end consumers',
      'Requires structured partnerships',
      'Complex integration efforts',
    ],
  },
  {
    id: 'saas',
    title: 'SaaS (Software-as-a-Service)',
    description:
      'A recurring subscription-based software model hosted in the cloud. Can be either B2B (like Salesforce) or B2C (like personal budgeting apps).',
    details: [
      'Focus on recurring revenue metrics',
      'Validation of payment model acceptance',
      'Emphasis on cloud stability and uptime',
    ],
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    description:
      'A platform connecting multiple parties (buyers/sellers, hosts/guests, freelancers/clients). You act as an intermediary enabling transactions.',
    details: [
      'Relies on network effects',
      'Must balance supply and demand',
      'Transaction-based revenue model',
    ],
  },
] as const

const stageInfo = [
  {
    id: 'idea',
    title: 'Idea Stage',
    description:
      "You have a concept but haven't started building anything yet.",
    details: [
      'Focused on problem validation',
      'Conducting market research',
      'Interviewing potential users',
    ],
  },
  {
    id: 'pre_mvp',
    title: 'Pre-MVP',
    description: 'You have a prototype or proof of concept in development.',
    details: [
      'Testing core assumptions',
      'Building basic prototype',
      'Gathering early feedback',
    ],
  },
  {
    id: 'mvp',
    title: 'MVP',
    description: 'You have a basic working product with core features.',
    details: [
      'Testing with early adopters',
      'Iterating based on feedback',
      'Validating core value proposition',
    ],
  },
  {
    id: 'post_launch',
    title: 'Post-Launch',
    description: 'Your product is live and being used by customers.',
    details: ['Growing user base', 'Optimizing features', 'Scaling operations'],
  },
] as const

const ExamplesPopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-h-[90vh] w-[90vw] max-w-3xl overflow-y-auto rounded-lg bg-white p-4 shadow-xl md:p-6 dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 md:top-4 lg:right-5 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <span className="text-2xl">×</span>
        </button>

        <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">
          Assumption Examples
        </h2>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {examples.map((example, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 lg:p-6 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <p className="mb-4 text-lg font-bold">{example.title}:</p>

              <p className="md:text-lg">{example.primaryAssumption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const TargetPersonasPopup: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-h-[90vh] w-[90vw] max-w-3xl overflow-y-auto rounded-lg bg-white p-4 shadow-xl md:p-6 dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 md:top-4 lg:right-5 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <span className="text-2xl">×</span>
        </button>

        <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">
          Target Personas Examples
        </h2>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {examples.map((example, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 lg:p-6 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <p className="mb-4 text-lg font-bold">{example.title}:</p>

              <SimpleUnorderedList items={example.targetPersonas} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const DefineConceptForm = ({
  problem,
  persona,
  region,
  productType,
  stage,
  cta,
}: Props) => {
  const [isPrimaryAssumptionExpanded, setIsPrimaryAssumptionExpanded] =
    useState<boolean>(true)
  const [isTargetPersonasExpanded, setIsTargetPersonasExpanded] =
    useState<boolean>(false)
  const [isRegionExpanded, setIsRegionExpanded] = useState<boolean>(false)
  const [isProductTypeExpanded, setIsProductTypeExpanded] =
    useState<boolean>(false)
  const [isStageExpanded, setIsStageExpanded] = useState<boolean>(false)
  const [isExamplesPopupOpen, setIsExamplesPopupOpen] = useState(false)
  const [isTargetPersonasPopupOpen, setIsTargetPersonasPopupOpen] =
    useState(false)

  const [status, setStatus] = useState<string>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    problem: problem,
    persona: persona,
    region: region,
    productType: productType,
    stage: stage,
  })

  const regions = [
    'worldwide',
    'north_america',
    'south_america',
    'europe',
    'asia',
    'africa',
    'oceania',
  ] as const

  type Region = (typeof regions)[number]

  const formatRegionName = (region: Region): string =>
    region
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
        >
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const router = useRouter()

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const validateForm = (): boolean => {
    const errors: string[] = []

    if (formData.problem.length < 64) {
      errors.push('Provide a detailed problem statement (min 64 characters)')
    }

    if (formData.persona.length < 64) {
      errors.push('Describe your target personas (min 64 characters)')
    }

    if (!formData.region) {
      errors.push('Select a target market region')
    }

    if (!formData.productType) {
      errors.push('Select your product type')
    }

    if (!formData.stage) {
      errors.push('Select your current stage')
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setStatus('loading')
      setErrorMessage(null)

      const res = await fetch('/api/concepts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem: formData.problem,
          persona: formData.persona,
          region: formData.region,
          product_type: formData.productType,
          stage: formData.stage,
        }),
      })

      if (res.status === 201) {
        const data = await res.json()
        router.push(`/concepts/${data.id}`)
      } else {
        const errorData = await res.json()
        setErrorMessage(errorData.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
      setStatus('error')
      console.error('Error submitting form:', error)
    }
  }

  const problemMaxLength = 2048
  const personaMaxLength = 2048
  const problemRemainingCharacters = problemMaxLength - formData.problem.length
  const personaRemainingCharacters = personaMaxLength - formData.persona.length

  return (
    <form onSubmit={handleSubmit}>
      <SectionWrapper id="primary_assumption">
        <SectionHeader
          onClick={() =>
            setIsPrimaryAssumptionExpanded(!isPrimaryAssumptionExpanded)
          }
          isExpanded={isPrimaryAssumptionExpanded}
          sectionId="section_primary_assumption"
        >
          <span className="inline-block w-8 md:w-10">🎯</span> Define the
          Assumption
        </SectionHeader>

        {isPrimaryAssumptionExpanded && (
          <div id="section_primary_assumption">
            <SimpleUnorderedList
              items={[
                'Focus on the problem and your hypothesis about the solution',
                'Be specific about who has this problem and why it matters',
                'Avoid listing product features or implementation details',
              ]}
            />

            <textarea
              id="problem"
              name="problem"
              className="mt-4 block h-48 w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-[#023840] focus:ring-[#023840] md:mt-0 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-[#7bf179] dark:focus:ring-[#7bf179]"
              value={formData.problem}
              onChange={handleChange}
              required
              placeholder={`I/we suppose that [target audiences] might have a [specific problem problem] that can be solved by [offering a solution], which allows them to [benefit].`}
              minLength={64}
              maxLength={2048}
            />

            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsExamplesPopupOpen(true)}
                className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <span className="mr-2">💡</span> Show Examples
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {problemRemainingCharacters} characters remaining
              </p>
            </div>

            <ExamplesPopup
              isOpen={isExamplesPopupOpen}
              onClose={() => setIsExamplesPopupOpen(false)}
            />
          </div>
        )}
      </SectionWrapper>

      <HorizontalLine />

      <SectionWrapper id="target_personas">
        <SectionHeader
          onClick={() => setIsTargetPersonasExpanded(!isTargetPersonasExpanded)}
          isExpanded={isTargetPersonasExpanded}
          sectionId="section_target_personas"
        >
          <span className="inline-block w-8 md:w-10">👥</span> Identify Target
          Personas
        </SectionHeader>

        {isTargetPersonasExpanded && (
          <div id="section_target_personas">
            <SimpleUnorderedList
              items={[
                'Describe your ideal customers and their roles',
                'Explain their key pain points and motivations',
                'Consider both primary and secondary customer groups',
              ]}
            />

            <textarea
              id="persona"
              name="persona"
              className="mt-4 block h-48 w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-[#023840] focus:ring-[#023840] md:mt-0 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-[#7bf179] dark:focus:ring-[#7bf179]"
              value={formData.persona}
              onChange={handleChange}
              required
              placeholder={`1. Early-Stage Startup Founders
2. Side-Hustle Creators

These people will save time, money, and reduce the risk of building a product nobody wants.`}
              minLength={64}
              maxLength={2048}
            />

            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsTargetPersonasPopupOpen(true)}
                className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <span className="mr-2">💡</span> Show Examples
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {personaRemainingCharacters} characters remaining
              </p>
            </div>

            <TargetPersonasPopup
              isOpen={isTargetPersonasPopupOpen}
              onClose={() => setIsTargetPersonasPopupOpen(false)}
            />
          </div>
        )}
      </SectionWrapper>

      <HorizontalLine />

      <SectionWrapper id="region">
        <SectionHeader
          onClick={() => setIsRegionExpanded(!isRegionExpanded)}
          isExpanded={isRegionExpanded}
          sectionId="section_region"
        >
          <span className="inline-block w-8 md:w-10">🌍</span> Choose Your
          Market
        </SectionHeader>

        {isRegionExpanded && (
          <div id="section_region">
            <Paragraph>
              Choose a specific region to start with. This helps you:
            </Paragraph>

            <SimpleUnorderedList
              items={[
                'Focus your market research',
                'Understand local customer needs',
                'Test assumptions in a controlled environment',
                'Create a targeted go-to-market strategy',
              ]}
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() =>
                    handleChange({ target: { name: 'region', value: region } })
                  }
                  className={`rounded-full px-4 py-2 font-medium transition-colors
                    ${
                      formData.region === region
                        ? 'bg-[#023840] text-[#7bf179] dark:bg-[#7bf179] dark:text-[#023840]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-800'
                    }`}
                >
                  {formatRegionName(region)}
                </button>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      <HorizontalLine />

      <SectionWrapper id="product_type">
        <SectionHeader
          onClick={() => setIsProductTypeExpanded(!isProductTypeExpanded)}
          isExpanded={isProductTypeExpanded}
          sectionId="section_product_type"
        >
          <span className="inline-block w-8 md:w-10">🏢</span> Product or
          Business Model
        </SectionHeader>

        {isProductTypeExpanded && (
          <div id="section_product_type">
            <Paragraph>
              Select the category that best matches your product or business
              model:
            </Paragraph>

            <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 lg:mt-8">
              {businessTypeInfo.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    handleChange({
                      target: {
                        name: 'productType',
                        value: type.id,
                      },
                    })
                  }
                  className={`group relative flex flex-col rounded-lg border p-4 text-left transition-colors md:p-6
                    ${
                      formData.productType === type.id
                        ? 'border-[#023840] dark:border-[#7bf179]'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:border-gray-600 dark:hover:bg-gray-800/50'
                    }`}
                >
                  {formData.productType === type.id && (
                    <span className="absolute right-4 top-4 text-xl">⭐️</span>
                  )}
                  <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl dark:text-gray-100">
                    {type.title}
                  </h3>
                  <p className="mb-4 text-gray-900 dark:text-gray-100">
                    {type.description}
                  </p>
                  <ul className="ml-5 list-disc space-y-1 text-gray-900 dark:text-gray-100">
                    {type.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      <HorizontalLine />

      <SectionWrapper id="stage">
        <SectionHeader
          onClick={() => setIsStageExpanded(!isStageExpanded)}
          isExpanded={isStageExpanded}
          sectionId="section_stage"
        >
          <span className="inline-block w-8 md:w-10">📈</span> Your Current
          Stage
        </SectionHeader>

        {isStageExpanded && (
          <div id="section_stage">
            <Paragraph>
              Select the stage that best matches your current progress:
            </Paragraph>

            <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 lg:mt-8">
              {stageInfo.map((stage) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() =>
                    handleChange({
                      target: {
                        name: 'stage',
                        value: stage.id,
                      },
                    })
                  }
                  className={`group relative flex flex-col rounded-lg border p-4 text-left transition-colors md:p-6
                    ${
                      formData.stage === stage.id
                        ? 'border-[#023840] dark:border-[#7bf179]'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:border-gray-600 dark:hover:bg-gray-800/50'
                    }`}
                >
                  {formData.stage === stage.id && (
                    <span className="absolute right-4 top-4 text-xl">⭐️</span>
                  )}
                  <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl dark:text-gray-100">
                    {stage.title}
                  </h3>
                  <p className="mb-4 text-gray-900 dark:text-gray-100">
                    {stage.description}
                  </p>
                  <ul className="ml-5 list-disc space-y-1 text-gray-900 dark:text-gray-100">
                    {stage.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      <HorizontalLine />

      {status === 'error' && errorMessage && (
        <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      {validationErrors.length > 0 && (
        <div className="my-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 md:my-6 md:p-6 dark:bg-red-900/20">
          <div className="ml-2 md:ml-4">
            <h3 className="mb-3 text-lg font-semibold text-red-800 dark:text-red-200">
              Please address the following:
            </h3>
            <div className="text-base text-red-700 dark:text-red-300">
              <ul className="list-disc space-y-2 pl-5">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 pb-2 text-center">
        <button
          type="submit"
          className="rounded-md border border-transparent bg-[#023840] px-6 py-4 text-2xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Saving...' : cta || 'Show Me Insights'}
        </button>
      </div>
    </form>
  )
}

export default DefineConceptForm
