const FetchingDataMessage = () => (
  <div className="mb-6 mt-4 flex items-center rounded-lg border border-purple-200 bg-purple-50 p-4 shadow-md md:text-lg">
    <div className="mr-4 size-6 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
    <p>
      Hang tight! We&apos;re fetching your data... This make take up to 30
      seconds...
    </p>
  </div>
)

export default FetchingDataMessage
