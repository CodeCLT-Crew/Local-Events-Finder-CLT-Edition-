import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex gap-6 items-center">
      <Link to="/" className="font-bold text-lg">CLT Events</Link>
      <Link to="/events" className="hover:underline">Events</Link>
    </nav>
  );
}
