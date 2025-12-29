import { useEffect, useState } from 'react'
import axios from 'axios'

const CategoryFilter = ({ currentCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([
    { value: 'general', label: 'General' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' }
  ])

  useEffect(() => {
    // Fetch categories from backend (optional)
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories')
        setCategories(response.data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    
    fetchCategories()
  }, [])

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelectCategory(cat.value)}
          className={`px-4 py-2 rounded-full transition-colors ${
            currentCategory === cat.value
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter