import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-6">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  )
}

export default NotFound