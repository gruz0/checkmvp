'use client'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import CheckMVPLogoDark from '../../public/CheckMVP-Logo-Dark.svg'
import CheckMVPLogo from '../../public/CheckMVP-Logo.svg'

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Image
      src={resolvedTheme === 'dark' ? CheckMVPLogo.src : CheckMVPLogoDark.src}
      alt="CheckMVP"
      width="150"
      height="40"
    />
  )
}
