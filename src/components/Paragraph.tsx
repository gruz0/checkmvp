import React from 'react'
import { cn } from '@/lib/utils'

interface ParagraphProps {
  last?: boolean
  children: React.ReactNode
}

const Paragraph: React.FC<ParagraphProps> = ({ children, last }) => (
  <p className={cn('mb-6 md:text-lg', last && 'mb-0')}>{children}</p>
)

export default Paragraph
