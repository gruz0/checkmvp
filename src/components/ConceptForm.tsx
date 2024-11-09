'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormField from '@/components/FormField'
import Paragraph from '@/components/Paragraph'

interface Props {
  problem: string
}

const examples = [
  {
    title: 'Personal Finance App',
    description: `Individuals often find it challenging to manage their monthly expenses and savings goals. Current budgeting apps can be too complex, leading users to abandon them. A simpler solution that allows users to visualize their spending habits and set realistic savings targets could greatly improve financial management.

Target Audience:
1. Individuals struggling with budgeting
2. Young adults entering the workforce
3. Families seeking to save for specific goals`,
  },
  {
    title: 'Meal Planning Service',
    description: `Busy families often struggle to plan healthy meals while managing their time and budgets. Current meal planning solutions can be overwhelming and lack personalization. A service that tailors meal plans to specific dietary preferences and family sizes could provide significant value.

Target Audience:
1. Busy families
2. Health-conscious individuals
3. Budget-conscious consumers`,
  },
  {
    title: 'Remote Team Collaboration Tool',
    description: `Remote teams frequently face challenges in maintaining effective communication and collaboration. Many existing platforms do not address the unique needs of remote work, resulting in misunderstandings and a lack of engagement. A solution that combines project management with intuitive communication tools could enhance team productivity.

Target Audience:
1. Remote teams
2. Freelancers and independent contractors
3. Managers overseeing remote projects`,
  },
  {
    title: 'Mental Health Support App',
    description: `Individuals seeking mental health support often feel overwhelmed by the number of available resources and don’t know where to start. Current solutions can be generic and lack personalization. An app that offers tailored self-help resources based on user input could significantly improve access to mental wellness support.

Target Audience:
1. Individuals experiencing mental health challenges
2. Parents looking for support
3. Young adults navigating life transitions`,
  },
  {
    title: 'Virtual Fitness Coach App',
    description: `I want to build an app that connects users with certified personal trainers for virtual workout sessions, tailored fitness plans, and nutritional guidance. Users can select trainers based on their fitness goals, such as weight loss, muscle gain, or general wellness.

Target Audience:
1. Busy professionals
2. Fitness beginners
3. Individuals with specific fitness goals`,
  },
  {
    title: 'Sustainable Living App',
    description: `I'm building a platform that helps users adopt more sustainable practices in their daily lives, providing tips, tracking progress, and connecting them with local eco-friendly resources.

Target Audience:
1. Environmentally conscious consumers
2. Families aiming to teach sustainability
3. Students interested in environmental issues`,
  },
  {
    title: 'Skill Swap Marketplace',
    description: `I want to build an app that allows users to exchange skills and services with one another, such as tutoring, gardening, or home repairs, promoting community collaboration and learning.

Target Audience:
1. Local community members
2. Hobbyists
3. Freelancers`,
  },
  {
    title: 'Personalized Learning Platform',
    description: `We are building an educational app that provides customized learning paths based on individual users' interests, goals, and preferred learning styles, using AI to adapt content and suggestions.

Target Audience:
1. Lifelong learners
2. Students preparing for exams
3. Professionals looking to upskill`,
  },
]

const DefineConceptForm = ({ problem }: Props) => {
  const [status, setStatus] = useState<string>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    problem: problem,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
        }),
      })

      if (res.status === 201) {
        const data = await res.json()
        router.push(`/concepts/${data.id}`)
        setStatus('success')
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="problem"
        label="Describe the Problem Your Product Aims to Solve"
        description="Tell us about the specific issue your product addresses. The clearer the problem, the more valuable our feedback will be. Focus on the challenges or frustrations that people face, and how your product intends to alleviate them."
        placeholder={`I want to create an app that connects individuals seeking emotional support with trained professionals or peer support groups. This platform would ensure users receive the help they need in times of crisis or emotional distress.

Target Audience:
1. Individuals experiencing mental health challenges
2. Parents seeking support
3. Caregivers of individuals with mental health issues`}
        value={formData.problem}
        onChange={handleChange}
        type="textarea"
        required
        minLength={20}
        maxLength={2048}
      />

      {status === 'error' && errorMessage && (
        <div className="mb-4 rounded bg-red-200 p-4 text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="pb-2 text-center">
        <button
          type="submit"
          className="rounded-md border border-transparent bg-blue-600 px-6 py-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Saving...' : 'Analyze Idea'}
        </button>
      </div>

      <hr className="my-6 md:my-8" />

      <div>
        <h2 className="mb-2 text-xl font-bold">
          A Few Examples For Inspiration
        </h2>

        <Paragraph>
          Click one of the buttons below to replace the content in the form
          above with a helpful example. Remember to take note of your own
          thoughts and ideas so you don’t lose them!
        </Paragraph>

        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <button
              type="button"
              key={index}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 shadow transition-all duration-200 hover:bg-gray-200"
              onClick={(e) => {
                e.preventDefault()
                setFormData({ problem: example.description })
              }}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}

export default DefineConceptForm
