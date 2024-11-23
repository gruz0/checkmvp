import Link from 'next/link'
import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'

const className =
  'block rounded px-4 py-2 text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-200'

export const NavBar = ({ ideaId }: { ideaId: string }) => (
  <nav className="space-y-1">
    <Link href="#short_form_content" className={className}>
      Short-Form Content
    </Link>
    <Link href="#long_form_content" className={className}>
      Long-Form Content
    </Link>
    <Link href="#video_content" className={className}>
      Video Content
    </Link>

    <HorizontalLine />

    <Link href={`/ideas/${ideaId}`} className={className}>
      Back to the Report
    </Link>
  </nav>
)
