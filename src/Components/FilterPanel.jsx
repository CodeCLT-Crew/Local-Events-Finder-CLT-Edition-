import { useState } from 'react';
import { Filter, X, Calendar, DollarSign, MapPin, Tag, ChevronDown } from 'lucide-react';

export default function FilterPanel({ onFiltersChange, isOpen, onToggle }) {
  const [filters, setFilters] = useState({
    category: '',
    dateRange: '',
    priceRange: '',
    source: '',
    isFree: false
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'music', label: 'Music & Concerts' },
    { value: 'sports', label: 'Sports' },
    { value: 'arts', label: 'Arts & Theater' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'family', label: 'Family & Kids' },
    { value: 'food', label: 'Food & Drink' },
    { value: 'technology', label: 'Technology' },
    { value: 'community', label: 'Community' }
  ];

  const dateRanges = [
    { value: '', label: 'Any Time' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-weekend', label: 'This Weekend' },
    { value: 'next-week', label: 'Next Week' },
    { value: 'this-month', label: 'This Month' }
  ];

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: 'free', label: 'Free Events' },
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100+', label: '$100+' }
  ];

  const sources = [
    { value: '', label: 'All Sources' },
    { value: 'ticketmaster', label: 'Ticketmaster' },
    { value: 'eventbrite', label: 'Eventbrite (Coming Soon)', disabled: true },
    { value: 'local', label: 'Local Charlotte (Coming Soon)', disabled: true }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      dateRange: '',
      priceRange: '',
      source: '',
      isFree: false
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== false);

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        <Filter size={16} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters</span>
        {hasActiveFilters && (
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {Object.values(filters).filter(value => value !== '' && value !== false).length}
          </span>
        )}
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filter Events</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Tag size={16} />
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} />
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} />
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} />
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {sources.map((source) => (
                  <option
                    key={source.value}
                    value={source.value}
                    disabled={source.disabled}
                    style={source.disabled ? { color: '#9CA3AF' } : {}}
                  >
                    {source.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Free Events Toggle */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.isFree}
                onChange={(e) => handleFilterChange('isFree', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Show only free events</span>
            </label>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {categories.find(c => c.value === filters.category)?.label}
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      className="ml-1 hover:text-blue-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.dateRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {dateRanges.find(d => d.value === filters.dateRange)?.label}
                    <button
                      onClick={() => handleFilterChange('dateRange', '')}
                      className="ml-1 hover:text-green-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.priceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                    {priceRanges.find(p => p.value === filters.priceRange)?.label}
                    <button
                      onClick={() => handleFilterChange('priceRange', '')}
                      className="ml-1 hover:text-purple-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.source && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                    {sources.find(s => s.value === filters.source)?.label}
                    <button
                      onClick={() => handleFilterChange('source', '')}
                      className="ml-1 hover:text-orange-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.isFree && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full">
                    Free Events Only
                    <button
                      onClick={() => handleFilterChange('isFree', false)}
                      className="ml-1 hover:text-emerald-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
