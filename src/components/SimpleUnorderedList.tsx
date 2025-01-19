import React from 'react'
import { cn } from '@/lib/utils'

interface SimpleUnorderedListProps {
  items: string[]
  last?: boolean
}

const SimpleUnorderedList: React.FC<SimpleUnorderedListProps> = ({
  items,
  last,
}) => (
  <ul className={cn('mb-4 list-disc pl-4', last && 'mb-0')}>
    {items.map((item, index) => (
      <li key={index} className="mb-2 pl-1 md:pl-2 md:text-lg">
        {item}
      </li>
    ))}
  </ul>
)

export default SimpleUnorderedList
