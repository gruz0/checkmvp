import Link from 'next/link'

const Template = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-100">
    <nav className="w-full bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center space-x-8">
          <Link href="/" className="text-gray-900 hover:text-blue-500">
            Home
          </Link>
          <Link href="/ideas/new" className="text-gray-900 hover:text-blue-500">
            Add New Idea
          </Link>
        </div>
      </div>
    </nav>

    <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-6 shadow-md">{children}</div>
    </main>
  </div>
)

export default Template
