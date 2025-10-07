import { 
  getEventIcon, 
  getEventColor, 
  formatPrice, 
  formatEventDate,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  Star
} from '../utils/eventIcons';

export default function EventCard({ event }) {
  const IconComponent = getEventIcon(event.classifications?.[0]);
  const colorClasses = getEventColor(event.classifications?.[0]);
  const venue = event._embedded?.venues?.[0];
  const priceInfo = formatPrice(event.priceRanges);
  const dateInfo = formatEventDate(event.dates);
  
  // Get event image
  const getEventImage = () => {
    if (event.images && event.images.length > 0) {
      // Find the best image (prefer 16:9 ratio images)
      const image = event.images.find(img => img.ratio === '16_9') || event.images[0];
      return image.url;
    }
    return null;
  };

  const imageUrl = getEventImage();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Event Image */}
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <div className={`p-2 rounded-full ${colorClasses} shadow-md`}>
              <IconComponent size={20} />
            </div>
          </div>
          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
              <DollarSign size={14} />
              {priceInfo}
            </div>
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className="p-6">
        {/* Event Category & Source */}
        <div className="flex items-center justify-between mb-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${colorClasses}`}>
            {!imageUrl && <IconComponent size={16} />}
            {event.classifications?.[0]?.segment?.name || 'Event'}
          </div>
          {/* Event Source Badge */}
          <div className="flex items-center gap-2">
            {event.source && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium">
                {event.source}
              </span>
            )}
            {/* Placeholder rating - could be enhanced with real data */}
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={14} fill="currentColor" />
              <span className="text-xs text-gray-600">4.5</span>
            </div>
          </div>
        </div>

        {/* Event Title */}
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 leading-tight">
          {event.name}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} className="text-blue-500 flex-shrink-0" />
            <span className="text-sm">{dateInfo}</span>
          </div>
          
          {/* Venue */}
          {venue && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-sm truncate">{venue.name}</span>
            </div>
          )}

          {/* Price (if no image) */}
          {!imageUrl && (
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-sm font-semibold">{priceInfo}</span>
            </div>
          )}
        </div>

        {/* Genre/Subgenre */}
        {event.classifications?.[0]?.genre?.name && (
          <div className="mb-4">
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
              {event.classifications[0].genre.name}
            </span>
          </div>
        )}

        {/* Action Button */}
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          <span>View Details</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
