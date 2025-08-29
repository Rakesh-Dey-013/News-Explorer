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
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY
  const API_URL = import.meta.env.VITE_NEWS_API_URL

  const fetchNews = async (query = '', category = 'general', pageNum = 1) => {
    setLoading(true)
    setError(null)
    try {
      let url = `${API_URL}/top-headlines?country=us&pageSize=12&page=${pageNum}&apiKey=${API_KEY}`
      
      if (query) {
        url = `${API_URL}/everything?q=${query}&pageSize=12&page=${pageNum}&sortBy=publishedAt&apiKey=${API_KEY}`
      } else if (category) {
        url += `&category=${category}`
      }

      const response = await axios.get(url)
      setNews(prev => pageNum === 1 ? response.data.articles : [...prev, ...response.data.articles])
      setTotalResults(response.data.totalResults)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (article) => {
    const isFavorite = favorites.some(fav => fav.url === article.url)
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.url !== article.url)
      setFavorites(updatedFavorites)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    } else {
      const updatedFavorites = [...favorites, article]
      setFavorites(updatedFavorites)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }
  }

  useEffect(() => {
    fetchNews(searchQuery, category, page)
  }, [searchQuery, category, page])

  return (
    <NewsContext.Provider value={{
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
      fetchNews,
      favorites,
      toggleFavorite
    }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => useContext(NewsContext)