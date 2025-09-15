import Events from "./Events";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Welcome to Local Events Finder – CLT Edition
        </h2>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Browse and discover exciting events happening in Charlotte!
        </p>
        <Events />
      </div>
    </div>
  );
}