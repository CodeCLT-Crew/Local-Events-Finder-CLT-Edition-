import { Link, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Search, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-xl hover:text-blue-200 transition-all duration-200 transform hover:scale-105"
        >
          <div className="p-2 bg-white/10 rounded-lg">
            <Calendar size={24} className="text-white" />
          </div>
          <span className="hidden sm:block">CLT Events</span>
          <span className="sm:hidden">CLT</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive('/')
                ? 'bg-white/20 text-white shadow-md'
                : 'hover:bg-white/10 hover:text-blue-200'
            }`}
          >
            <Home size={18} />
            <span className="hidden sm:block">Home</span>
          </Link>

          <Link
            to="/events"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive('/events')
                ? 'bg-white/20 text-white shadow-md'
                : 'hover:bg-white/10 hover:text-blue-200'
            }`}
          >
            <Search size={18} />
            <span className="hidden sm:block">Browse Events</span>
            <span className="sm:hidden">Events</span>
          </Link>

          {/* Location Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm">
            <MapPin size={16} />
            <span>Charlotte, NC</span>
          </div>
        </div>
      </div>
    </nav>
  );
}