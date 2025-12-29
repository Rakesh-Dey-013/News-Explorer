import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const NewsContext = createContext()

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('general')
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('news_favorites')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const fetchNews = async (query = '', category = 'general', pageNum = 1) => {
    setLoading(true)
    setError(null)
    try {
      let endpoint
      let params = {}
      
      if (query) {
        endpoint = '/api/news/search'
        params = { q: query, page: pageNum, pageSize: 12 }
      } else {
        endpoint = '/api/news/top-headlines'
        params = { category, page: pageNum, pageSize: 12 }
      }
      
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params })
      
      const filteredArticles = response.data.articles.filter(
        article => article.title && article.title !== '[Removed]'
      )
      
      setNews(prev => pageNum === 1 ? filteredArticles : [...prev, ...filteredArticles])
      setTotalResults(response.data.totalResults)
    } catch (err) {
      console.error('Error fetching news:', err)
      setError(
        err.response?.data?.error || 
        err.message || 
        'Failed to fetch news. Please try again later.'
      )
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (article) => {
    const isFavorite = favorites.some(fav => fav.url === article.url)
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.url !== article.url)
      setFavorites(updatedFavorites)
      if (typeof window !== 'undefined') {
        localStorage.setItem('news_favorites', JSON.stringify(updatedFavorites))
      }
    } else {
      const updatedFavorites = [...favorites, article]
      setFavorites(updatedFavorites)
      if (typeof window !== 'undefined') {
        localStorage.setItem('news_favorites', JSON.stringify(updatedFavorites))
      }
    }
  }

  const clearError = () => setError(null)
  
  const refreshNews = () => {
    setPage(1)
    fetchNews(searchQuery, category, 1)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('news_favorites')
      if (saved) setFavorites(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    fetchNews(searchQuery, category, page)
  }, [searchQuery, category, page])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, category])

  const value = {
    news,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    page,
    setPage,
    totalResults,
    favorites,
    fetchNews,
    toggleFavorite,
    clearError,
    refreshNews,
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