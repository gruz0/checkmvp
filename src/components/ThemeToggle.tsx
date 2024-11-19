'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-full bg-white p-2 text-2xl transition-colors duration-300 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      {resolvedTheme === 'dark' ? '🌞' : '🌜'}
    </button>
  )
}
