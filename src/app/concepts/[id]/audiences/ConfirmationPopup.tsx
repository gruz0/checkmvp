import React from 'react'
import HorizontalLine from '@/components/HorizontalLine'
import Paragraph from '@/components/Paragraph'
import SimpleUnorderedList from '@/components/SimpleUnorderedList'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  audience: {
    segment: string
    statement: string
    hypotheses: string[]
  } | null
  isLoading: boolean
}

const ConfirmationPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  audience,
  isLoading,
}) => {
  if (!isOpen || !audience) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-50 max-h-[90vh] w-[90vw] max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {audience.segment}
        </h2>

        <div className="mb-6">
          <Paragraph>{audience.statement}</Paragraph>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Hypotheses or Assumptions:
          </h3>

          <SimpleUnorderedList items={audience.hypotheses} />
        </div>

        <HorizontalLine />

        <div className="mt-4 flex justify-between">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-md border border-transparent bg-[#023840] px-4 py-2 font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 md:text-lg dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
          >
            {isLoading ? 'Processing...' : 'Request Analysis'}
          </button>
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 md:text-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup
