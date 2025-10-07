import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Star, ArrowRight, Music, Trophy, Palette } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: 'Multiple Sources',
      description: 'Events from Ticketmaster, Eventbrite, and local Charlotte sources',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: MapPin,
      title: 'Local Focus',
      description: 'Specifically curated for Charlotte and surrounding areas',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Users,
      title: 'All Categories',
      description: 'Music, sports, arts, food, technology, and community events',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const categories = [
    { name: 'Music & Concerts', icon: Music, color: 'from-purple-500 to-pink-500', count: '150+' },
    { name: 'Sports & Recreation', icon: Trophy, color: 'from-green-500 to-blue-500', count: '80+' },
    { name: 'Arts & Culture', icon: Palette, color: 'from-orange-500 to-red-500', count: '120+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6">
              Discover Amazing Events in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Charlotte
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your one-stop destination for concerts, sports, arts, food festivals, and community events
              happening in the Queen City. Find your next adventure today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Explore Events</span>
                <ArrowRight size={20} />
              </Link>

              <div className="flex items-center gap-2 text-gray-600">
                <Star size={20} className="text-yellow-500 fill-current" />
                <span className="font-medium">Trusted by 10,000+ Charlotte residents</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CLT Events?</h2>
          <p className="text-lg text-gray-600">Everything you need to stay connected with Charlotte's vibrant event scene</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className={`inline-flex p-3 rounded-full ${feature.color} mb-4`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Event Categories</h2>
            <p className="text-lg text-gray-600">Discover events that match your interests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/events"
                className="group relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative p-6">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${category.color} text-white mb-4`}>
                    <category.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-2xl font-bold text-gray-700">{category.count} events</p>
                  <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700">
                    <span className="font-medium">Explore category</span>
                    <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore Charlotte?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Charlotte residents who discover amazing events every day.
              Your next great experience is just a click away!
            </p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:text-blue-700 font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start Exploring</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}