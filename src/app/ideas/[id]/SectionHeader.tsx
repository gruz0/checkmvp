import React from 'react'
import type { IconType } from 'react-icons'

interface SectionHeaderProps {
  Icon: IconType
  color: string
  children: React.ReactNode
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  Icon,
  color,
  children,
}) => (
  <h2
    className={`mb-6 flex items-center text-xl font-semibold md:text-2xl xl:text-3xl ${color}`}
  >
    <Icon className="mr-2" />
    <p>{children}</p>
  </h2>
)

export default SectionHeader
