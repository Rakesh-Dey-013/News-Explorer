import { useState, useEffect } from 'react'
import { useNews } from '../context/NewsContext'
import Card from '../components/Card'
import CategoryFilter from '../components/CategoryFilter'
import SkeletonLoader from '../components/SkeletonLoader'

const Explore = () => {
  const { news, loading, error, fetchNews, category, setCategory, page, setPage, totalResults } = useNews()
  const [filter, setFilter] = useState('latest')

  useEffect(() => {
    fetchNews('', category, 1)
  }, [category, filter])

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8 mt-12">
        <h2 className="text-2xl font-bold text-white">Top News</h2>
        {/* <div className="flex space-x-2">
          <button
            onClick={() => setFilter('latest')}
            className={`px-4 py-2 rounded-lg ${filter === 'latest' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'}`}
          >
            Latest
          </button>
          <button
            onClick={() => setFilter('trending')}
            className={`px-4 py-2 rounded-lg ${filter === 'trending' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'}`}
          >
            Trending
          </button>
          <button
            onClick={() => setFilter('most-viewed')}
            className={`px-4 py-2 rounded-lg ${filter === 'most-viewed' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'}`}
          >
            Most Viewed
          </button>
        </div> */}
      </div>

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
          <p className="text-gray-400">Try a different filter or category</p>
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

export default Explore