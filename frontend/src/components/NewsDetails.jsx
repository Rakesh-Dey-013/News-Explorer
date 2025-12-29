import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaShare, FaRegBookmark, FaBookmark, FaExternalLinkAlt, FaClock, FaUser, FaEye } from 'react-icons/fa'
import { format } from 'date-fns'
import { useNews } from '../context/NewsContext'

const NewsDetails = () => {
  const { state } = useLocation()
  const { article } = state || {}
  const navigate = useNavigate()
  const { toggleFavorite, favorites } = useNews()
  const isFavorite = favorites.some(fav => fav.url === article.url)

  if (!article) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-transparent"
      >
        <div className="text-center p-8 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-2xl">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <FaEye className="text-red-400 text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Article Not Found</h2>
          <p className="text-slate-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    )
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      })
    } catch (err) {
      console.error('Error sharing:', err)
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(article.url)
      // Create a toast notification instead of alert
      const toast = document.createElement('div')
      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity'
      toast.textContent = 'Link copied to clipboard!'
      document.body.appendChild(toast)
      setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => document.body.removeChild(toast), 300)
      }, 2000)
    }
  }

  const readingTime = Math.ceil((article.content?.length || 1000) / 200)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-transparent"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Back Button */}
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-400 hover:text-white my-6 lg:my-8 transition-all duration-200 group mt-3"
        >
          <motion.div
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FaArrowLeft className="mr-3 mt-5" />
          </motion.div>
          <FaArrowLeft className="mr-3 group-hover:opacity-0 transition-opacity mt-5" />
          <span className="font-medium mt-5">Back to News</span>
        </motion.button>

        {/* Main Article Container */}
        <motion.article 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-linear-to-br from-zinc-800 via-zinc-800/60 to-zinc-800/80 backdrop-blur-xl rounded-none sm:rounded-2xl lg:rounded-3xl overflow-hidden border-0 sm:border border-slate-700/50 shadow-2xl mb-6 lg:mb-8"
        >
          {/* Hero Image */}
          <div className="relative overflow-hidden">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={article.urlToImage || 'https://via.placeholder.com/800x400?text=No+Image'} 
              alt={article.title}
              className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] xl:h-[70vh] object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            {/* Floating action buttons */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex space-x-2 sm:space-x-3">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(article)}
                className="backdrop-blur-md bg-slate-900/40 border border-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-slate-800/60 transition-all duration-200 shadow-lg"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <motion.div
                  animate={{ rotate: isFavorite ? [0, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isFavorite ? (
                    <FaBookmark className="text-amber-400" />
                  ) : (
                    <FaRegBookmark className="text-slate-300 hover:text-amber-400 transition-colors" />
                  )}
                </motion.div>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="backdrop-blur-md bg-slate-900/40 border border-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-slate-800/60 transition-all duration-200 shadow-lg"
                aria-label="Share article"
              >
                <FaShare className="text-slate-300 hover:text-blue-400 transition-colors" />
              </motion.button>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
            {/* Content Container for better reading width */}
            <div className="max-w-4xl mx-auto">
              {/* Meta Information */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 sm:mb-8 text-xs sm:text-sm"
              >
              <div className="flex items-center text-slate-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="font-medium">{article.source?.name}</span>
              </div>
              
              <div className="flex items-center text-slate-400">
                <FaClock className="mr-2" />
                <span>{format(new Date(article.publishedAt), 'MMMM d, yyyy • h:mm a')}</span>
              </div>
              
              <div className="flex items-center text-slate-400">
                <FaEye className="mr-2" />
                <span>{readingTime} min read</span>
              </div>
            </motion.div>

              {/* Article Title */}
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-300 mb-4 sm:mb-6 leading-tight bg-linear-to-r from-white to-slate-300 bg-clip-text"
              >
              {article.title}
            </motion.h1>
            
              {/* Author */}
              {article.author && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center mb-6 sm:mb-8"
                >
                  <div className="flex items-center bg-slate-700/50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-600/50">
                    <FaUser className="text-slate-400 mr-2 text-sm" />
                    <span className="text-slate-300 font-medium text-sm sm:text-base">By {article.author}</span>
                  </div>
                </motion.div>
              )}

              {/* Article Content */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                // className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none"
              >
                {article.description && (
                  <div className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-700/30 rounded-xl sm:rounded-2xl border-l-4 border-blue-500 leading-relaxed">
                    {article.description}
                  </div>
                )}
                
                {article.content && (
                  <div className="text-slate-300 leading-relaxed space-y-4 sm:space-y-6">
                    {article.content.replace(/\[\+\d+ chars\]/, '').split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="text-base sm:text-lg leading-7 sm:leading-8">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                )}
            </motion.div>

              {/* Read Full Article CTA */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700/50"
              >
                <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/20">
                  <h3 className="text-white font-semibold mb-2 sm:mb-3 text-base sm:text-lg">Want to read the complete article?</h3>
                  <p className="text-slate-300 mb-3 sm:mb-4 text-sm leading-relaxed">
                    Continue reading the full story with all details, quotes, and additional information on the original source.
                  </p>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 sm:gap-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
                  >
                    <span>Read Full Article</span>
                    <FaExternalLinkAlt className="text-xs sm:text-sm" />
                  </motion.a>
                  <div className="mt-2 sm:mt-3 text-xs text-slate-400">
                    Source: {article.source?.name}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  )
}

export default NewsDetails