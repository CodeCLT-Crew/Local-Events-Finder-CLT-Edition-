import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBar from '../Components/SearchBar';
import EventCard from '../Components/EventCard';
import SortingControls from '../Components/SortingControls';
import EventStats from '../Components/EventStats';
import FilterPanel from '../Components/FilterPanel';
import Pagination from '../Components/Pagination';
import { eventService } from '../api/eventService';

export default function Events() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('date-asc');
  const [eventStats, setEventStats] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    dateRange: '',
    priceRange: '',
    source: '',
    isFree: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const handleSearch = useCallback(async (query) => {
    setSearch(query);
    setLoading(true);
    setError('');
    try {
      const result = await eventService.fetchAllEvents({
        keyword: query,
        classificationName: 'music,sports,arts,family,film,miscellaneous'
      });
      setEvents(result.events);
      setEventStats(result);
      // console.log('Fetched events from all sources:', result);
    } catch (err) {
      setError('Failed to fetch events from one or more sources.', err);
      setEvents([]);
      setEventStats(null);
    }
    setLoading(false);
  }, []);

  // Fetch events on first load
  useEffect(() => {
    handleSearch('');
  }, [handleSearch]);

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...events];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(event =>
        event.classifications?.[0]?.segment?.name?.toLowerCase().includes(filters.category.toLowerCase()) ||
        event.classifications?.[0]?.genre?.name?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.source) {
      filtered = filtered.filter(event =>
        event.source?.toLowerCase() === filters.source.toLowerCase()
      );
    }

    if (filters.isFree) {
      filtered = filtered.filter(event => {
        const price = event.priceRanges?.[0];
        return !price || (price.min === 0 && price.max === 0);
      });
    }

    if (filters.priceRange && filters.priceRange !== 'free') {
      filtered = filtered.filter(event => {
        const price = event.priceRanges?.[0];
        if (!price) return filters.priceRange === '0-25';

        const min = price.min || 0;
        const max = price.max || price.min || 0;

        switch (filters.priceRange) {
          case '0-25':
            return max <= 25;
          case '25-50':
            return min >= 25 && max <= 50;
          case '50-100':
            return min >= 50 && max <= 100;
          case '100+':
            return min >= 100;
          default:
            return true;
        }
      });
    }

    if (filters.dateRange) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter(event => {
        if (!event.dates?.start?.localDate) return false;

        const eventDate = new Date(event.dates.start.localDate);

        switch (filters.dateRange) {
          case 'today': {
            return eventDate.toDateString() === today.toDateString();
          }
          case 'tomorrow': {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return eventDate.toDateString() === tomorrow.toDateString();
          }
          case 'this-week': {
            const weekEnd = new Date(today);
            weekEnd.setDate(weekEnd.getDate() + 7);
            return eventDate >= today && eventDate <= weekEnd;
          }
          case 'this-weekend': {
            const friday = new Date(today);
            const sunday = new Date(today);
            friday.setDate(today.getDate() + (5 - today.getDay() + 7) % 7);
            sunday.setDate(friday.getDate() + 2);
            return eventDate >= friday && eventDate <= sunday;
          }
          case 'next-week': {
            const nextWeekStart = new Date(today);
            const nextWeekEnd = new Date(today);
            nextWeekStart.setDate(today.getDate() + 7);
            nextWeekEnd.setDate(today.getDate() + 14);
            return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
          }
          case 'this-month': {
            const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            return eventDate >= today && eventDate <= monthEnd;
          }
          default:
            return true;
        }
      });
    }

    // Sort the filtered events
    return eventService.sortEvents(filtered, sortBy);
  }, [events, sortBy, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Paginate the filtered events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedEvents.slice(startIndex, endIndex);
  }, [filteredAndSortedEvents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Discover Events in Charlotte
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find amazing events happening in the Queen City. From concerts to sports, arts to community gatherings.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <SearchBar onSearch={handleSearch} />

          {/* Event Statistics */}
          {!loading && !error && eventStats && (
            <EventStats stats={eventStats} />
          )}

          {/* Filters */}
          {!loading && !error && events.length > 0 && (
            <FilterPanel
              onFiltersChange={handleFiltersChange}
              isOpen={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
            />
          )}

          {/* Results count and sorting */}
          {!loading && !error && events.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredAndSortedEvents.length}</span> of {events.length} events
                {search && <span> for "{search}"</span>}
              </p>
              <SortingControls onSort={setSortBy} currentSort={sortBy} />
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center mt-16 mb-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Finding amazing events for you...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
            <h3 className="font-semibold text-lg mb-2">Oops! Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && events.length === 0 && (
          <div className="mt-16 text-center">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search terms or check back later for new events!</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && paginatedEvents.length > 0 && (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredAndSortedEvents.length}
            />
          </>
        )}
      </div>
    </div>
  );
}
