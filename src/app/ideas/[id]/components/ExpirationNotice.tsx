interface Props {
  expirationDays: number
}

const ExpirationNotice = ({ expirationDays }: Props) => (
  <div className="mb-2 rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/30">
    <div className="flex items-start justify-between">
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-yellow-800 dark:text-yellow-100">
          <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 14.5h-3v-3h3v3zm0-5.5h-3V5.5h3V11z" />
          </svg>
          Important Notice
        </h2>
        <p className="text-yellow-800 dark:text-yellow-200">
          This idea will only be accessible for {expirationDays} days. After
          that, it will be archived automatically, and you won&apos;t be able to
          access it online. Download the PDF report now to save your idea
          locally. You can also remove it manually at any time using the button
          below.
        </p>
      </div>
    </div>
  </div>
)

export default ExpirationNotice
