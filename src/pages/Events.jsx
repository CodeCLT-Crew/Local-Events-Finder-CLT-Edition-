import { useState } from 'react';
import SearchBar from '../Components/SearchBar';

export default function Events() {
  const [search, setSearch] = useState('');
  // Placeholder for events data
  const events = [
    { id: 1, name: 'Charlotte Tech Meetup', category: 'Tech', date: '2025-07-01' },
    { id: 2, name: 'Free Summer Concert', category: 'Music', date: '2025-07-04' },
    { id: 3, name: 'Startup Networking', category: 'Tech', date: '2025-07-10' },
    { id: 4, name: 'Food Truck Friday', category: 'Food', date: '2025-07-05' },
  ];
  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <SearchBar onSearch={setSearch} />
      <ul className="space-y-4">
        {filtered.length === 0 && <li>No events found.</li>}
        {filtered.map(event => (
          <li key={event.id} className="border rounded p-4 bg-white text-black">
            <div className="font-semibold">{event.name}</div>
            <div className="text-sm text-gray-600">{event.category} | {event.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}