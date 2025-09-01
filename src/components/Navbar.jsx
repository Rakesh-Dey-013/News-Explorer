import { useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
// import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { GiNewspaper } from "react-icons/gi";
import SearchBar from './SearchBar'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-zinc-800/50 backdrop-blur-md border-b border-zinc-700 fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white flex gap-2">
            <GiNewspaper className="mt-1" />
            NewsHub
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <SearchBar />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Explore
              </Link>
              <Link
                to="/about"
                className="hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </div>
            <SearchBar mobile onSearch={() => setIsOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar