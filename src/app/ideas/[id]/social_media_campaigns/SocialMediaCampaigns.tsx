'use client'

import { useRouter } from 'next/navigation'
import { usePlausible } from 'next-plausible'
import React, { useEffect, useState } from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import FetchingDataMessage from '@/components/FetchingDataMessage'
import HorizontalLine from '@/components/HorizontalLine'
import { Goals } from '@/lib/goals'
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

  const [status, setStatus] = useState<string>('idle')

  const handleRequest = async () => {
    setStatus('loading')

    try {
      plausible(Goals.RequestSocialMediaCampaigns)

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
                    className="rounded bg-[#023840] px-4 py-2 font-semibold text-[#7bf179] hover:bg-[#034e59] dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
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

          {data.contents ? (
            <>
              <SectionShortFormContent data={data.contents.shortFormContent} />

              <HorizontalLine />

              <SectionLongFormContent data={data.contents.longFormContent} />

              <HorizontalLine />

              <SectionVideoContent data={data.contents.videoContent} />
            </>
          ) : (
            <>
              <HorizontalLine />

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
