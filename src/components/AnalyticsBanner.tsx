interface AnalyticsBannerProps {
  totalConceptsCount: number
}

const AnalyticsBanner: React.FC<AnalyticsBannerProps> = ({
  totalConceptsCount,
}) => (
  <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-4 text-lg text-green-800 md:mb-4 lg:mb-12">
    <p>
      Join hundreds of entrepreneurs who&apos;ve run{' '}
      <strong>{totalConceptsCount} startup analyses</strong> to refine and
      validate their ideas 🚀
    </p>
  </div>
)

export default AnalyticsBanner
