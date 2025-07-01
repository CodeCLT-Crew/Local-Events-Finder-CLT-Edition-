import  { useState, useEffect } from 'react';
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
      console.log('Fetched events:', data); // Debug output
    } catch (err) {
      setError('Failed to fetch events.');
      setEvents([]);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-4">
        {!loading && !error && events.length === 0 && <li>No events found.</li>}
        {events.map(event => (
          <li key={event.id} className="border rounded p-4 bg-white text-black">
            <div className="font-semibold">{event.name}</div>
            <div className="text-sm text-gray-600">{event.classifications?.[0]?.segment?.name} | {event.dates?.start?.localDate}</div>
            <div className="text-sm">{event._embedded?.venues?.[0]?.name}</div>
            <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}