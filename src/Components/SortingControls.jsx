import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export default function SortingControls({ onSort, currentSort }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'date-asc', label: 'Date (Earliest First)', icon: '📅' },
    { value: 'date-desc', label: 'Date (Latest First)', icon: '📅' },
    { value: 'name-asc', label: 'Name (A-Z)', icon: '🔤' },
    { value: 'name-desc', label: 'Name (Z-A)', icon: '🔤' },
    { value: 'price-asc', label: 'Price (Low to High)', icon: '💰' },
    { value: 'price-desc', label: 'Price (High to Low)', icon: '💰' },
    { value: 'relevance', label: 'Most Relevant', icon: '⭐' }
  ];

  const currentSortOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  const handleSortChange = (sortValue) => {
    onSort(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        <ArrowUpDown size={16} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          Sort: {currentSortOption.label}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 z-20 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 ${
                    currentSort === option.value 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                  {currentSort === option.value && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
