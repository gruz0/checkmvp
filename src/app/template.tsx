import Image from 'next/image'
import Link from 'next/link'
import CheckMVPLogo from '../../public/CheckMVP-Logo.png'

const Template = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-gray-100">
    <nav className="w-full bg-white shadow-md">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={CheckMVPLogo.src}
              alt="CheckMVP"
              width="150"
              height="40"
            />
          </Link>

          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/about"
              className="flex items-center space-x-1 text-gray-900 hover:text-blue-500"
              title="About"
            >
              About
            </Link>

            <Link
              href="/supporters"
              className="flex items-center space-x-1 text-gray-900 hover:text-blue-500"
              title="Supporters"
            >
              Supporters
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
