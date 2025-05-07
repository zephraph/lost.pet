import '../styles/mask.css';
import { getRecentLostPets } from '../rpc/pets';
import { CarouselScroller } from './CarouselScroller';
import { PetCard } from './PetCard';

export async function LostPetCarousel() {
  const pets = await getRecentLostPets();

  return (
    <div className="relative overflow-hidden rounded-xl bg-white/10 p-8 backdrop-blur-sm">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Recently Lost Pets</h3>
        <a
          href="/listings"
          className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
        >
          View all listings
          <span aria-hidden="true">→</span>
        </a>
      </div>
      
      <div className="relative -mx-8">
        <CarouselScroller>
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </CarouselScroller>
      </div>
    </div>
  );
} 