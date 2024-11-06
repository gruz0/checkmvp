import Link from 'next/link'

const Template = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-gray-100">
    <nav className="w-full bg-white shadow-md">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">CheckMVP</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              href="https://github.com/gruz0/checkmvp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-900 hover:text-blue-500"
              title="GitHub Repo"
            >
              GitHub
            </Link>
            <Link
              href="https://x.com/itmistakes_com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-900 hover:text-blue-500"
              title="Twitter (X)"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </nav>

    <main className="mx-auto w-full max-w-5xl grow px-4 py-6">
      <div className="w-full rounded-lg bg-white shadow-md">{children}</div>
    </main>

    <footer className="bg-gray-200 px-6 py-2 text-center">
      <p className="text-sm text-gray-700">
        Built with ❤️ to startup founders and indie makers by{' '}
        <Link
          href="https://www.linkedin.com/in/alexanderkadyrov"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Alex Kadyrov
        </Link>
      </p>
    </footer>
  </div>
)

export default Template
