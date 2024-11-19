export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="mb-6 text-4xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-lg">
        Sorry, the concept you&apos;re looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 inline-block text-lg text-blue-500 hover:underline"
      >
        Go back to the homepage
      </a>
    </div>
  )
}
