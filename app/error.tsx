'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Something went wrong!
          </h1>
          <p className="text-gray-400">
            Don't worry, it's not your fault. Try again?
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <summary className="cursor-pointer text-red-400 font-semibold mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-red-300 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all inline-block"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}
