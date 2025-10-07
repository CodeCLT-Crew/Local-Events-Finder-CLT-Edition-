import { BarChart3, Globe, Calendar, MapPin } from 'lucide-react';

export default function EventStats({ stats }) {
  if (!stats) return null;

  const { sourceBreakdown, totalCount } = stats;

  const sourceColors = {
    ticketmaster: 'bg-blue-100 text-blue-800',
    eventbrite: 'bg-orange-100 text-orange-800',
    local: 'bg-green-100 text-green-800'
  };

  const sourceIcons = {
    ticketmaster: Globe,
    eventbrite: Calendar,
    local: MapPin
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={20} className="text-gray-600" />
        <h3 className="font-semibold text-gray-900">Event Sources</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(sourceBreakdown).map(([source, count]) => {
          const IconComponent = sourceIcons[source] || Globe;
          const colorClass = sourceColors[source] || 'bg-gray-100 text-gray-800';
          const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
          
          return (
            <div key={source} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${colorClass}`}>
                  <IconComponent size={16} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {source === 'local' ? 'Local Charlotte' : source}
                    {(source === 'eventbrite' || source === 'local') && (
                      <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(source === 'eventbrite' || source === 'local') ? 'Temporarily disabled' : `${percentage}% of results`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-gray-500">events</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Events Found</span>
          <span className="text-lg font-bold text-gray-900">{totalCount}</span>
        </div>
      </div>
    </div>
  );
}
