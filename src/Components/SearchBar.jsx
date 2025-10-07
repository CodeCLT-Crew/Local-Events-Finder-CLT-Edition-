import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // 500ms delay

  // Trigger search when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <Search size={20} />
        </div>

        <input
          type="text"
          className="w-full pl-12 pr-20 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-white shadow-sm"
          placeholder="Search for concerts, sports, theater, and more..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </div>

      {/* Quick search suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {['Concerts', 'Sports', 'Comedy', 'Theater', 'Free Events'].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion);
            }}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  );
}
