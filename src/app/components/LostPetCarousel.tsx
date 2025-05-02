"use client";

import { useEffect, useRef } from 'react';
import '../styles/mask.css';

// Mock data - in real app this would come from props/API
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
  }
];

export function LostPetCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateMask = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isAtStart = scrollLeft <= 0;
    const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

    // Update CSS custom properties based on scroll position
    container.style.setProperty('--mask-start-opacity', isAtStart ? '1' : '0');
    container.style.setProperty('--mask-end-opacity', isAtEnd ? '1' : '0');
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Initial check
    updateMask();

    // Add scroll listener
    container.addEventListener('scroll', updateMask);
    
    // Cleanup
    return () => container.removeEventListener('scroll', updateMask);
  }, []);

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
        {/* Scrolling container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mask-horizontal px-8"
        >
          {MOCK_PETS.map((pet) => (
            <div
              key={pet.id}
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
                <p className="text-sm text-gray-400">Missing since: {pet.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 