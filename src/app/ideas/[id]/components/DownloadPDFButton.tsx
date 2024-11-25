'use client'
import React, { useState } from 'react'

interface DownloadPDFButtonProps {
  ideaId: string
  onClick?: () => void
}

type DownloadError = string | null

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
  ideaId,
  onClick,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<DownloadError>(null)

  const handleDownload = async () => {
    if (onClick) {
      onClick()
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/ideas/${ideaId}/pdf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      })

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`
        try {
          const errorData = await response.json()
          if (errorData.error) {
            errorMessage = `Error: ${errorData.error}`
          }
        } catch (parseError) {
          errorMessage = (parseError as Error).message
        }
        throw new Error(errorMessage)
      }

      const blob = await response.blob()

      const url = window.URL.createObjectURL(new Blob([blob]))

      const link = document.createElement('a')
      link.href = url

      const filename = 'CheckMVP-Report.pdf'
      link.setAttribute('download', filename)

      document.body.appendChild(link)

      link.click()

      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error downloading PDF:', err)

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred while downloading the PDF.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`rounded px-4 py-2 font-semibold text-white transition-colors duration-200 ${
          loading
            ? 'cursor-not-allowed bg-blue-400'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-busy={loading}
        aria-disabled={loading}
      >
        {loading ? 'Generating PDF...' : 'Download PDF'}
      </button>
      {error && (
        <p className="mt-2 text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default DownloadPDFButton
