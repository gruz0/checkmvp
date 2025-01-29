const FetchingDataMessage = () => (
  <div className="mb-6 mt-4 flex items-center rounded-lg border border-[#023840] bg-[#023840]/5 p-4 shadow-md md:text-lg dark:bg-[#023840]/20">
    <div className="mr-4 size-6 animate-spin rounded-full border-4 border-[#023840] border-t-[#7bf179] dark:border-[#7bf179] dark:border-t-[#023840]" />
    <p className="font-medium text-[#023840] dark:text-[#7bf179]">
      Hang tight! We&apos;re analyzing your content and gathering insights...
      This may take up to 1 minute...
    </p>
  </div>
)

export default FetchingDataMessage
