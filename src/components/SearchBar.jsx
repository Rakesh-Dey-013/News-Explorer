import { useState } from 'react'
import { useNews } from '../context/NewsContext'
import { FiSearch } from 'react-icons/fi'

const SearchBar = ({ mobile, onSearch }) => {
  const [query, setQuery] = useState('')
  const { setSearchQuery, setCategory, setPage } = useNews()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(query)
    setCategory('')
    setPage(1)
    if (onSearch) onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className={`${mobile ? 'w-full' : 'w-64'}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
    </form>
  )
}

export default SearchBar