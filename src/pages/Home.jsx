import { useEffect } from 'react'
import { useNews } from '../context/NewsContext'
import Card from '../components/Card'
import CategoryFilter from '../components/CategoryFilter'
import SkeletonLoader from '../components/SkeletonLoader'

const Home = () => {
  const { news, loading, error, fetchNews, category, setCategory, page, setPage, totalResults } = useNews()

  useEffect(() => {
    fetchNews('', category, 1)
  }, [category])

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Error loading news</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button 
          onClick={() => fetchNews('', category, 1)}
          className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className='mt-13'>
      <CategoryFilter currentCategory={category} onSelectCategory={setCategory} />
      
      {loading && page === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-4">No news found</h2>
          <p className="text-gray-400">Try a different search or category</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, i) => (
              <Card key={`${article.url}-${i}`} article={article} />
            ))}
          </div>

          {news.length < totalResults && (
            <div className="mt-10 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home