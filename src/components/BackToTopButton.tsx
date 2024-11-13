'use client'
import React, { useEffect, useState } from 'react'

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 hidden rounded-lg px-4 py-3 text-2xl text-white shadow-lg transition-colors duration-300 hover:bg-blue-600 focus:outline-none md:bottom-10 md:right-10 md:block"
          aria-label="Back to Top"
        >
          ⬆️
        </button>
      )}
    </>
  )
}

export default BackToTopButton
