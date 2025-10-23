export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-8xl font-black gradient-text mb-4">404</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all inline-block"
          >
            Back to Home
          </a>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Lost? Here are some helpful links:</p>
          <div className="mt-4 flex gap-4 justify-center">
            <a href="/dashboard" className="text-violet-400 hover:text-violet-300">Dashboard</a>
            <a href="/explore" className="text-cyan-400 hover:text-cyan-300">Explore</a>
            <a href="/chat" className="text-emerald-400 hover:text-emerald-300">AI Chat</a>
          </div>
        </div>
      </div>
    </div>
  )
}
