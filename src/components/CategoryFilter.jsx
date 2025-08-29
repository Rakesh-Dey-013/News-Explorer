import { categories } from '../constants/categories'

const CategoryFilter = ({ currentCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelectCategory(cat.value)}
          className={`px-3 py-1 text-sm rounded-full border ${
            currentCategory === cat.value
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-zinc-700 text-gray-400 hover:bg-zinc-800'
          } transition-colors`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter