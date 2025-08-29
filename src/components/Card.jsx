import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FaRegBookmark, FaBookmark, FaExternalLinkAlt, FaClock } from 'react-icons/fa'
import { useNews } from '../context/NewsContext'

const Card = ({ article }) => {
  const { toggleFavorite, favorites } = useNews()
  const isFavorite = favorites.some(fav => fav.url === article.url)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-slate-900/70 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-600/5 to-zinc-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="relative overflow-hidden">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'} 
            alt={article.title}
            className="w-full h-48 object-cover transition-transform duration-300"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          
          {/* Bookmark button with glassmorphism */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(article)}
            className="absolute top-3 right-3 backdrop-blur-md bg-slate-900/40 border border-white/10 p-2.5 rounded-xl hover:bg-slate-800/60 transition-all duration-200 shadow-lg"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <motion.div
              animate={{ rotate: isFavorite ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isFavorite ? (
                <FaBookmark className="text-amber-400 text-sm" />
              ) : (
                <FaRegBookmark className="text-slate-300 hover:text-amber-400 text-sm transition-colors" />
              )}
            </motion.div>
          </motion.button>
          
          {/* Source badge */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 backdrop-blur-sm border border-white/10 text-slate-200">
              {article.source?.name}
            </span>
          </div>
        </div>
        
        <div className="p-5 space-y-4">
          {/* Date with icon */}
          <div className="flex items-center text-xs text-slate-400">
            <FaClock className="mr-1.5" />
            {format(new Date(article.publishedAt), 'MMM d, yyyy • h:mm a')}
          </div>
          
          {/* Title */}
          <Link to={`/news/${encodeURIComponent(article.title)}`} state={{ article }}>
            <motion.h3 
              whileHover={{ x: 4 }}
              className="text-lg font-bold text-slate-100 leading-tight line-clamp-2 hover:text-blue-400 transition-all duration-200 cursor-pointer"
            >
              {article.title}
            </motion.h3>
          </Link>
          
          <br />
          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
            {article.description}
          </p>
          
          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <Link 
              to={`/news/${encodeURIComponent(article.title)}`} 
              state={{ article }}
              className="group/btn inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-all duration-200"
            >
              <span>Read Article</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="opacity-0 group-hover/btn:opacity-100 transition-opacity"
              >
                <FaExternalLinkAlt className="text-xs" />
              </motion.div>
            </Link>
            
            {/* Reading time estimate */}
            <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-lg">
              {Math.ceil((article.description?.length || 100) / 200)} min read
            </span>
          </div>
        </div>
      </div>
      
      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-sm" />
      </div>
    </motion.div>
  )
}

export default Card