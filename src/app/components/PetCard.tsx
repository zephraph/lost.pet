"use client"

export function PetCard({ pet }: { pet: any }) {
  return (
    <div
      onClick={() => window.location.href = `/pet/${pet.id}`}
      className="cursor-pointer flex-shrink-0 rounded-lg bg-black/20 p-4 transition-transform hover:scale-[1.02]"
      style={{ width: '300px' }}
    >
      <img
        src={pet.image}
        alt={`${pet.name} - Lost ${pet.type}`}
        className="mb-4 h-40 w-full rounded-lg object-cover"
      />
      <div>
        <h4 className="text-xl font-semibold">{pet.name}</h4>
        <p className="text-gray-300">{pet.breed} • {pet.type}</p>
        <p className="mt-2 text-gray-400">Last seen: {pet.lastSeen}</p>
        <p className="text-sm text-gray-400">
          Missing since: {new Date(pet.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
} 