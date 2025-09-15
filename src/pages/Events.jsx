import { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import { fetchCharlotteEvents } from '../api/ticketmaster';

export default function Events() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch events on first load
  useEffect(() => {
    handleSearch('');
    // eslint-disable-next-line
  }, []);

  const handleSearch = async (query) => {
    setSearch(query);
    setLoading(true);
    setError('');
    try {
      const data = await fetchCharlotteEvents({ keyword: query, classificationName: 'music,free,tech' });
      setEvents(data);
      console.log('Fetched events:', data);
    } catch (err) {
      setError('Failed to fetch events.');
      setEvents([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Discover Events in Charlotte
        </h2>
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="mt-6 text-center text-gray-600 text-lg">
            No events found. Try a different search!
          </p>
        )}

 {/* GRID LAYOUT */}
<div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {events.map(event => (
    <div
      key={event.id}
      className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="font-semibold text-xl text-gray-800">{event.name}</div>
      <div className="text-sm text-gray-500 mt-1">
        {event.classifications?.[0]?.segment?.name} | {event.dates?.start?.localDate}
      </div>
      <div className="text-sm text-gray-600 mt-1">{event._embedded?.venues?.[0]?.name}</div>
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-blue-600 font-medium hover:text-blue-800 underline transition-colors duration-200"
      >
        View Details
      </a>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}
