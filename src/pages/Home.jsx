import Events from "./Events";

export default function Home() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Welcome to Local Events Finder – CLT Edition</h2>
      <p>Browse and discover events happening in Charlotte!</p>
      <Events/>
    </div>
  );
}
