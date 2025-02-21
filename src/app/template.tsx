import Link from 'next/link'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'

const Template = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-300 dark:bg-gray-900">
    <nav className="w-full bg-white shadow-md transition-colors duration-300 dark:bg-gray-800">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          <div className="flex items-center space-x-4 md:space-x-6">
            <ThemeToggle />

            <Link
              href="/about"
              className="flex items-center space-x-1 text-gray-900 transition-colors duration-300 hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-400"
              title="About"
            >
              About
            </Link>

            <Link
              href="/supporters"
              className="flex items-center space-x-1 text-gray-900 transition-colors duration-300 hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-400"
              title="Supporters"
            >
              Supporters
            </Link>
          </div>
        </div>
      </div>
    </nav>

    <main className="mx-auto w-full max-w-5xl grow px-4 py-6">
      <div className="w-full rounded-lg bg-white shadow-md transition-colors duration-300 dark:bg-gray-800">
        {children}
      </div>
    </main>

    <footer className="bg-gray-100 px-2 py-6 transition-colors duration-300 md:px-6 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-16">
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
              🎯 Solutions For
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/agencies"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Software Development Agencies
                </Link>
              </li>
              <li>
                <Link
                  href="/startups"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Startups & Entrepreneurs
                </Link>
              </li>
              <li>
                <Link
                  href="/indie-hackers"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Indie Hackers
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  9-5 Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/freelancers"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Freelancers
                </Link>
              </li>
              <li>
                <Link
                  href="/product-managers"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Product Managers
                </Link>
              </li>
              <li>
                <Link
                  href="/mvp-specialists"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  MVP Specialists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
              📚 Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Free AI Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/supporters"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Supporters
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/newsletters/7275106167452782593/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
              💬 Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/gruz0/checkmvp/issues"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  GitHub Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/itmistakes_com"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Twitter (X)
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/alexanderkadyrov"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://t.me/gruz0"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Telegram
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:kadyrov.dev@gmail.com"
                  className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Email Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Built with ❤️ to startup founders and indie makers by{' '}
            <Link
              href="https://www.linkedin.com/in/alexanderkadyrov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 transition-colors duration-300 hover:underline dark:text-blue-400"
            >
              Alex Kadyrov
            </Link>
          </p>
        </div>
      </div>
    </footer>
  </div>
)

export default Template
