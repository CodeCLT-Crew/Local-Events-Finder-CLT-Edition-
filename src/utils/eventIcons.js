import { 
  Music, 
  Theater, 
  Trophy, 
  Gamepad2, 
  Palette, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Star,
  ExternalLink
} from 'lucide-react';

// Map event categories to appropriate icons
export const getEventIcon = (classification) => {
  const segment = classification?.segment?.name?.toLowerCase() || '';
  const genre = classification?.genre?.name?.toLowerCase() || '';
  const subGenre = classification?.subGenre?.name?.toLowerCase() || '';
  
  // Music events
  if (segment.includes('music') || genre.includes('music') || 
      genre.includes('rock') || genre.includes('pop') || 
      genre.includes('jazz') || genre.includes('classical') ||
      genre.includes('country') || genre.includes('hip hop') ||
      genre.includes('electronic')) {
    return Music;
  }
  
  // Sports events
  if (segment.includes('sports') || genre.includes('basketball') ||
      genre.includes('football') || genre.includes('baseball') ||
      genre.includes('hockey') || genre.includes('soccer') ||
      genre.includes('tennis') || genre.includes('golf')) {
    return Trophy;
  }
  
  // Arts & Theater
  if (segment.includes('arts') || segment.includes('theatre') ||
      genre.includes('theater') || genre.includes('comedy') ||
      genre.includes('dance') || genre.includes('opera')) {
    return Theater;
  }
  
  // Gaming & Technology
  if (genre.includes('gaming') || genre.includes('esports') ||
      subGenre.includes('video games') || genre.includes('technology')) {
    return Gamepad2;
  }
  
  // Art & Culture
  if (genre.includes('art') || genre.includes('cultural') ||
      genre.includes('exhibition') || genre.includes('museum')) {
    return Palette;
  }
  
  // Community & Social
  if (genre.includes('community') || genre.includes('social') ||
      genre.includes('networking') || genre.includes('meetup')) {
    return Users;
  }
  
  // Default icon
  return Calendar;
};

// Get event category color
export const getEventColor = (classification) => {
  const segment = classification?.segment?.name?.toLowerCase() || '';
  const genre = classification?.genre?.name?.toLowerCase() || '';
  
  if (segment.includes('music') || genre.includes('music')) {
    return 'text-purple-600 bg-purple-100';
  }
  if (segment.includes('sports')) {
    return 'text-green-600 bg-green-100';
  }
  if (segment.includes('arts') || segment.includes('theatre')) {
    return 'text-pink-600 bg-pink-100';
  }
  if (genre.includes('gaming') || genre.includes('technology')) {
    return 'text-blue-600 bg-blue-100';
  }
  if (genre.includes('art') || genre.includes('cultural')) {
    return 'text-orange-600 bg-orange-100';
  }
  if (genre.includes('community') || genre.includes('social')) {
    return 'text-indigo-600 bg-indigo-100';
  }
  
  return 'text-gray-600 bg-gray-100';
};

// Format price display
export const formatPrice = (priceRanges) => {
  if (!priceRanges || priceRanges.length === 0) {
    return 'Price TBA';
  }
  
  const price = priceRanges[0];
  if (price.min === 0 && price.max === 0) {
    return 'Free';
  }
  
  if (price.min === price.max) {
    return `$${price.min}`;
  }
  
  return `$${price.min} - $${price.max}`;
};

// Format date display
export const formatEventDate = (dateInfo) => {
  if (!dateInfo?.start?.localDate) {
    return 'Date TBA';
  }
  
  const date = new Date(dateInfo.start.localDate);
  const time = dateInfo.start.localTime;
  
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  if (time) {
    const timeStr = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return `${dateStr} at ${timeStr}`;
  }
  
  return dateStr;
};

export { Music, Theater, Trophy, Gamepad2, Palette, Users, Calendar, MapPin, Clock, DollarSign, Star, ExternalLink };
