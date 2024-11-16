'use client'
import React from 'react'

interface SocialShareButtonProps {
  platform: 'twitter' | 'linkedin'
  content: string
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  platform,
  content,
}) => {
  const handleClick = () => {
    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(content)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
          content
        )}`
        break
      default:
        return
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer,nofollow')
  }

  return (
    <button
      onClick={handleClick}
      className="rounded bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-700 hover:text-white"
    >
      {platform === 'twitter' && 'Twitter'}
      {platform === 'linkedin' && 'LinkedIn'}
    </button>
  )
}

export default SocialShareButton
