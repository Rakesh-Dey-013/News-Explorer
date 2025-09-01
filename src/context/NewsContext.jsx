import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const NewsContext = createContext()

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('general')
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [favorites, setFavorites] = useState(() => {
    // Get favorites from localStorage if they exist
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('news_favorites')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  // Determine API base URL based on environment
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

const fetchNews = async (query = '', category = 'general', pageNum = 1) => {
  setLoading(true)
  setError(null)

  try {
    const params = new URLSearchParams()
    if (query) params.append('query', query)
    if (category && category !== 'general') params.append('category', category)
    params.append('page', pageNum)
    params.append('pageSize', 12)

    const response = await axios.get(`${API_BASE}/news?${params.toString()}`)

    const filteredArticles = response.data.articles.filter(
      article => article.title && article.title !== '[Removed]'
    )

    setNews(prev =>
      pageNum === 1 ? filteredArticles : [...prev, ...filteredArticles]
    )
    setTotalResults(response.data.totalResults)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}


  const toggleFavorite = (article) => {
    // Check if article is already in favorites
    const isFavorite = favorites.some(fav => fav.url === article.url)
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.url !== article.url)
      setFavorites(updatedFavorites)
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('news_favorites', JSON.stringify(updatedFavorites))
      }
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, article]
      setFavorites(updatedFavorites)
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('news_favorites', JSON.stringify(updatedFavorites))
      }
    }
  }

  const clearError = () => {
    setError(null)
  }

  const refreshNews = () => {
    setPage(1)
    fetchNews(searchQuery, category, 1)
  }

  // Load favorites from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('news_favorites')
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    }
  }, [])

  // Fetch news when search query, category, or page changes
  useEffect(() => {
    fetchNews(searchQuery, category, page)
  }, [searchQuery, category, page])

  // Reset to page 1 when search query or category changes
  useEffect(() => {
    setPage(1)
  }, [searchQuery, category])

  const value = {
    // State
    news,
    loading,
    error,
    searchQuery,
    category,
    page,
    totalResults,
    favorites,
    
    // Actions
    setSearchQuery,
    setCategory,
    setPage,
    fetchNews,
    toggleFavorite,
    clearError,
    refreshNews,
    
    // Computed values
    hasMore: news.length < totalResults,
    isFavorite: (article) => favorites.some(fav => fav.url === article.url)
  }

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}