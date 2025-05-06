import { RequestInfo } from "rwsdk/worker";
import { Footer } from "../components/Footer";

export function Pet({ ctx, params }: RequestInfo) {
  // In a real app, this would fetch from your database
  const pet = {
    id: params.id,
    name: "Luna",
    type: "Dog",
    breed: "Golden Retriever",
    image: "https://placedog.net/500/300",
    lastSeen: "Central Park, NYC",
    date: "2024-03-15",
    description: "Luna is a friendly Golden Retriever who loves people. She was last seen near the lake in Central Park wearing a red collar with tags.",
    contact: {
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john@example.com"
    },
    features: [
      "Red collar with ID tags",
      "Microchipped",
      "Very friendly",
      "Responds to name",
      "Medium size (45 lbs)"
    ]
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Image */}
          <div>
            <img
              src={pet.image}
              alt={`${pet.name} - Lost ${pet.type}`}
              className="w-full rounded-lg object-cover shadow-xl"
              style={{ height: '500px' }}
            />
          </div>

          {/* Right Column - Pet Information */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{pet.name}</h1>
              <p className="text-xl text-gray-300">{pet.breed} • {pet.type}</p>
            </div>

            <div className="rounded-lg bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold text-rose-400">Status</h2>
              <div className="space-y-2 text-gray-300">
                <p><strong>Last Seen:</strong> {pet.lastSeen}</p>
                <p><strong>Missing Since:</strong> {pet.date}</p>
              </div>
            </div>

            <div className="rounded-lg bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold text-rose-400">Description</h2>
              <p className="text-gray-300">{pet.description}</p>
            </div>

            <div className="rounded-lg bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold text-rose-400">Identifying Features</h2>
              <ul className="list-inside list-disc space-y-2 text-gray-300">
                {pet.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-emerald-600/20 p-6">
              <h2 className="mb-4 text-xl font-semibold text-emerald-400">Contact Information</h2>
              <div className="space-y-2 text-gray-300">
                <p><strong>Name:</strong> {pet.contact.name}</p>
                <p><strong>Phone:</strong> {pet.contact.phone}</p>
                <p><strong>Email:</strong> {pet.contact.email}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors">
                Report Sighting
              </button>
              <button className="flex-1 rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 