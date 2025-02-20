import React from 'react'
import BackToTopButton from '@/components/BackToTopButton'
import { NavBar } from './NavBar'

interface Props {
  ideaId: string
  activePath: string
  reportIsReady: boolean
  children: React.ReactNode
}

export const MainContainer = ({
  ideaId,
  activePath,
  reportIsReady,
  children,
}: Props) => (
  <div className="p-4 md:p-6">
    <div className="flex flex-col md:flex-row">
      <aside className="sticky top-4 self-start bg-gray-100 md:w-1/3 md:p-2 lg:w-1/4 lg:rounded-lg lg:shadow-lg dark:bg-gray-900">
        <NavBar
          ideaId={ideaId}
          activePath={activePath}
          reportIsReady={reportIsReady}
        />
      </aside>

      <div className="flex-1 md:pl-8">{children}</div>
    </div>

    <BackToTopButton />
  </div>
)
