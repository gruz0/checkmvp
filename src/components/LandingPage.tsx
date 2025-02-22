import Link from 'next/link'

interface SectionProps {
  heading: string
  children: React.ReactNode
}

interface SectionGridProps {
  children: React.ReactNode
}

interface SectionCellProps {
  heading: string
  description: string
  centerizeDescription?: boolean
  children?: React.ReactNode
}

interface HeadingProps {
  children: React.ReactNode
}

interface SubheadingProps {
  children: React.ReactNode
}

interface CheckListProps {
  items: string[]
}

interface PrimaryCTAProps {
  children: React.ReactNode
  utmSource: string
  utmCampaign: string
}

interface SecondaryCTAProps {
  children: React.ReactNode
  utmSource: string
  utmCampaign: string
}

export const Section: React.FC<SectionProps> = ({ heading, children }) => (
  <div className="mt-8 pb-4 md:mt-10 md:pb-6 lg:mt-14 lg:pb-8">
    <h2 className="mb-4 text-center text-2xl font-bold text-[#023840] md:mb-8 md:text-3xl lg:text-4xl dark:text-gray-100">
      {heading}
    </h2>
    {children}
  </div>
)

export const SectionGrid: React.FC<SectionGridProps> = ({ children }) => (
  <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
    {children}
  </div>
)

export const SectionGridTwoColumns: React.FC<SectionGridProps> = ({
  children,
}) => (
  <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 md:gap-6 lg:gap-8">
    {children}
  </div>
)

export const SectionCell: React.FC<SectionCellProps> = ({
  heading,
  description,
  centerizeDescription = false,
  children,
}) => (
  <div className="flex h-full flex-col rounded-lg bg-gray-50 px-6 py-5 shadow-lg lg:hover:bg-gray-100 dark:bg-gray-700 dark:lg:hover:bg-gray-600">
    <h3 className="mb-2 text-center text-xl font-semibold md:mb-3">
      {heading}
    </h3>
    <p className={`flex ${centerizeDescription ? 'text-center' : 'text-left'}`}>
      {description}
    </p>
    {children && <div className="mt-4 flex justify-center">{children}</div>}
  </div>
)

export const Heading: React.FC<HeadingProps> = ({ children }) => (
  <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-[#023840] md:mb-8 md:mt-4 md:text-4xl lg:mb-8 dark:text-gray-100">
    {children}
  </h1>
)

export const Subheading: React.FC<SubheadingProps> = ({ children }) => (
  <p className="mb-6 text-center text-lg font-semibold md:text-xl lg:mb-10 lg:text-2xl">
    {children}
  </p>
)

export const CheckList: React.FC<CheckListProps> = ({ items }) => (
  <div className="mb-6 space-y-4 text-lg">
    {items.map((item, index) => (
      <div key={index} className="flex items-start space-x-3">
        <span className="font-bold text-green-600">✓</span>
        <p>{item}</p>
      </div>
    ))}
  </div>
)

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({
  children,
  utmSource,
  utmCampaign,
}) => (
  <Link
    href={`/start?utm_source=${utmSource}&utm_medium=primary_cta&utm_campaign=${utmCampaign}`}
    className={`justify-center rounded-md border border-transparent bg-[#023840] px-8 py-4 text-xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]`}
  >
    {children}
  </Link>
)

export const SecondaryCTA: React.FC<SecondaryCTAProps> = ({
  children,
  utmSource,
  utmCampaign,
}) => (
  <Link
    href={`/start?utm_source=${utmSource}&utm_medium=secondary_cta&utm_campaign=${utmCampaign}`}
    className={`justify-center rounded-md border border-transparent bg-[#023840] px-8 py-4 text-2xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]`}
  >
    {children}
  </Link>
)
