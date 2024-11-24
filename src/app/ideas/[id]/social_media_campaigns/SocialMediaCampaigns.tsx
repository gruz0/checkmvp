'use client'

import { useRouter } from 'next/navigation'
import { usePlausible } from 'next-plausible'
import React, { useEffect, useState } from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import FeedbackForm from '@/components/FeedbackForm'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import HorizontalLine from '@/components/HorizontalLine'
import { NavBar } from './components/NavBar'
import SectionLongFormContent from './components/SectionLongFormContent'
import SectionShortFormContent from './components/SectionShortFormContent'
import SectionVideoContent from './components/SectionVideoContent'

interface Props {
  data: {
    id: string
    contents: {
      shortFormContent: Array<{
        header: string
        platform: string
        content: string
        tips: string[]
        imagePrompt: string
      }>
      longFormContent: Array<{
        header: string
        platform: string
        title: string
        content: string
        tips: string[]
        imagePrompt: string
      }>
      videoContent: Array<{
        header: string
        platform: string
        title: string
        script: string[]
        tips: string[]
        imagePrompt: string
      }>
    } | null
  }
}

const reloadInterval = 5000

export const SocialMediaCampaigns = ({ data }: Props) => {
  const router = useRouter()
  const plausible = usePlausible()

  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [wrongSection, setWrongSection] = useState<string | null>(null)

  const [status, setStatus] = useState<string>('idle')

  const onReport = (section: string) => {
    if (!section) {
      return
    }

    setWrongSection(section)

    setShowFeedbackForm(true)
  }

  const handleFeedbackSubmit = async (feedback: string, contact: string) => {
    if (!wrongSection) {
      return
    }

    try {
      setWrongSection(null)
      setShowFeedbackForm(false)

      const res = await fetch(`/api/ideas/${data.id}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: wrongSection,
          feedback: feedback.trim(),
          contact: contact.trim(),
        }),
      })

      if (res.status === 201) {
        setWrongSection(null)
        setShowFeedbackForm(false)
      } else {
        const errorData = await res.json()

        alert(errorData.error || 'Something went wrong.')

        setWrongSection(null)
        setShowFeedbackForm(false)
      }
    } catch (error) {
      alert(`Error submitting report: ${error}`)
    }
  }

  const handleRequest = async () => {
    setStatus('loading')

    try {
      plausible('request_social_media_campaigns')

      const res = await fetch(`/api/ideas/${data.id}/social_media_campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 200) {
        // Do nothing. The page will be reloaded automatically
      } else {
        setStatus('error')
        const errorData = await res.json()

        alert(errorData.error || 'Something went wrong.')
      }
    } catch (error) {
      setStatus('error')
      alert(`Error requesting social media campaigns: ${error}`)
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (status === 'loading') {
      if (data.contents === null) {
        intervalId = setInterval(() => {
          router.refresh()
        }, reloadInterval)
      } else {
        setStatus('ready')
      }
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [status, router, data.contents])

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row">
        <aside className="sticky top-4 hidden self-start rounded-lg bg-gray-100 p-2 shadow-lg md:block md:w-1/4 dark:bg-gray-900">
          <NavBar ideaId={data.id} />
        </aside>

        <div className="flex-1 md:pl-8">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl dark:text-gray-200">
              Social Media Campaigns
            </h1>

            {data.contents === null && (
              <>
                {status === 'idle' ? (
                  <button
                    onClick={handleRequest}
                    className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Request
                  </button>
                ) : (
                  <span className="rounded bg-gray-500 px-4 py-2 font-semibold text-white">
                    Loading...
                  </span>
                )}
              </>
            )}
          </div>

          <HorizontalLine />

          {showFeedbackForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="max-w-2xl rounded bg-white p-4 shadow-md md:p-8 dark:bg-gray-900">
                <FeedbackForm
                  onSubmit={handleFeedbackSubmit}
                  onClose={() => setShowFeedbackForm(false)}
                />
              </div>
            </div>
          )}

          {data.contents ? (
            <>
              <SectionShortFormContent
                onReport={onReport}
                data={data.contents.shortFormContent}
              />

              <SectionLongFormContent
                onReport={onReport}
                data={data.contents.longFormContent}
              />

              <SectionVideoContent
                onReport={onReport}
                data={data.contents.videoContent}
              />
            </>
          ) : (
            <>
              {status === 'idle' ? (
                <p className="pt-6 text-lg">
                  Please click &quot;Request&quot; button above to fetch your
                  content.
                </p>
              ) : (
                <FetchingDataMessage />
              )}
            </>
          )}
        </div>
      </div>

      <BackToTopButton />
    </div>
  )
}
