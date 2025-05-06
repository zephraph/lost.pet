import { RequestInfo } from "@redwoodjs/sdk/worker";
import { Footer } from "../components/Footer";

// Using the same mock data from LostPetCarousel for now
const MOCK_PETS = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    lastSeen: 'Brooklyn, NY',
    date: '2024-03-20',
    image: 'https://placedog.net/400/400?r'
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    lastSeen: 'Queens, NY',
    date: '2024-03-19',
    image: 'https://placecats.com/400/400'
  },
  {
    id: 3,
    name: 'Charlie',
    type: 'Dog',
    breed: 'French Bulldog',
    lastSeen: 'Manhattan, NY',
    date: '2024-03-18',
    image: 'https://placedog.net/401/401?r'
  },
  {
    id: 4,
    name: 'Bella',
    type: 'Dog',
    breed: 'Labrador',
    lastSeen: 'Bronx, NY',
    date: '2024-03-17',
    image: 'https://placedog.net/402/402?r'
  },
  {
    id: 5,
    name: 'Oliver',
    type: 'Cat',
    breed: 'Persian',
    lastSeen: 'Staten Island, NY',
    date: '2024-03-16',
    image: 'https://placecats.com/401/401'
  },
  // Adding more mock pets for the grid
  {
    id: 6,
    name: 'Lucy',
    type: 'Dog',
    breed: 'Poodle',
    lastSeen: 'Manhattan, NY',
    date: '2024-03-15',
    image: 'https://placedog.net/403/403?r'
  },
  {
    id: 7,
    name: 'Milo',
    type: 'Cat',
    breed: 'Maine Coon',
    lastSeen: 'Brooklyn, NY',
    date: '2024-03-14',
    image: 'https://placecats.com/402/402'
  },
  {
    id: 8,
    name: 'Rocky',
    type: 'Dog',
    breed: 'German Shepherd',
    lastSeen: 'Queens, NY',
    date: '2024-03-13',
    image: 'https://placedog.net/404/404?r'
  }
];

export function Listings({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Lost Pet Listings</h1>
          <p className="text-xl text-gray-300">Help reunite these pets with their families</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Pet Type</label>
            <select className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white">
              <option value="">All Types</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Location</label>
            <select className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white">
              <option value="">All Locations</option>
              <option value="manhattan">Manhattan</option>
              <option value="brooklyn">Brooklyn</option>
              <option value="queens">Queens</option>
              <option value="bronx">Bronx</option>
              <option value="staten-island">Staten Island</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Date Range</label>
            <select className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white">
              <option value="">Any Time</option>
              <option value="today">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Sort By</label>
            <select className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white">
              <option value="recent">Most Recent</option>
              <option value="location">Nearest Location</option>
            </select>
          </div>
        </div>

        {/* Grid of Pets */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_PETS.map((pet) => (
            <a
              key={pet.id}
              href={`/pet/${pet.id}`}
              className="group rounded-lg bg-black/20 p-4 transition-transform hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={pet.image}
                  alt={`${pet.name} - Lost ${pet.type}`}
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                />
                <div className="absolute bottom-4 left-2 rounded bg-black/60 px-2 py-1 text-sm">
                  {new Date(pet.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold group-hover:text-rose-400 transition-colors">
                  {pet.name}
                </h2>
                <p className="text-gray-300">{pet.breed} • {pet.type}</p>
                <p className="mt-2 text-gray-400">Last seen: {pet.lastSeen}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="rounded-lg bg-white/10 px-8 py-3 font-semibold text-white hover:bg-white/20 transition-colors">
            Load More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
} 