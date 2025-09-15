import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-4 sm:px-6 py-4 flex gap-6 items-center sticky top-0 z-10 shadow-md">
      <Link to="/" className="font-bold text-xl hover:text-blue-200 transition-colors duration-200">
        CLT Events
      </Link>
      <Link to="/events" className="hover:text-blue-200 hover:underline transition-colors duration-200">
        Events
      </Link>
    </nav>
  );
}