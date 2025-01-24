const AboutReport = () => (
  <div className="my-6 rounded-lg bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/20">
    <div className="flex items-start justify-between">
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-blue-900 dark:text-blue-100">
          <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          About This Report
        </h2>
        <div className="space-y-4">
          <p className="text-blue-800 dark:text-blue-200">
            Hey there! I&apos;m Alex, the founder of CheckMVP. As a fellow
            maker, I built this app to help early-stage founders quickly refine
            and validate their ideas and avoid common pitfalls I&apos;ve
            encountered in my own journey.
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            This analysis is powered by specialized AI prompts, developed
            through real-world feedback. While the insights are valuable, they
            should complement—not replace—your own research and intuition.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="https://www.linkedin.com/newsletters/7275106167452782593/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              Follow My Building Journey
            </a>
            <a
              href="https://cal.com/alexkadyrov/checkmvp"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full rounded-md bg-blue-100 px-4 py-2 text-center text-sm font-medium text-blue-700 transition hover:bg-blue-200 sm:w-auto dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
            >
              Book a Strategy Call
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AboutReport
