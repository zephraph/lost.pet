"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/mask.css";
import type { Pet } from "@/db";
import { getRecentLostPets } from "../rpc/pets";

// Client component for handling scroll behavior
function CarouselScroller({ children }: { children: React.ReactNode }) {
	const scrollRef = useRef<HTMLDivElement>(null);

	const updateMask = useCallback(() => {
		const container = scrollRef.current;
		if (!container) return;

		const { scrollLeft, scrollWidth, clientWidth } = container;
		const isAtStart = scrollLeft <= 0;
		const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

		container.style.setProperty("--mask-start-opacity", isAtStart ? "1" : "0");
		container.style.setProperty("--mask-end-opacity", isAtEnd ? "1" : "0");
	}, []);

	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		updateMask();
		container.addEventListener("scroll", updateMask);
		return () => container.removeEventListener("scroll", updateMask);
	}, [updateMask]);

	return (
		<div
			ref={scrollRef}
			className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mask-horizontal px-8"
		>
			{children}
		</div>
	);
}

// Server component that fetches and displays the pets
export function LostPetCarousel() {
	const [pets, setPets] = useState<Pet[]>([]);

	useEffect(() => {
		getRecentLostPets().then(setPets);
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
				<CarouselScroller>
					{pets.map((pet) => (
						<a
							key={pet.id}
							href={`/pet/${pet.id}`}
							className="cursor-pointer flex-shrink-0 rounded-lg bg-black/20 p-4 transition-transform hover:scale-[1.02]"
							style={{ width: "300px" }}
						>
							<img
								src={pet.image}
								alt={`${pet.name} - Lost ${pet.type}`}
								className="mb-4 h-40 w-full rounded-lg object-cover"
							/>
							<div>
								<h4 className="text-xl font-semibold">{pet.name}</h4>
								<p className="text-gray-300">
									{pet.breed} • {pet.type}
								</p>
								<p className="mt-2 text-gray-400">
									Last seen: {new Date(pet.lastSeen).toLocaleDateString()}
								</p>
							</div>
						</a>
					))}
				</CarouselScroller>
			</div>
		</div>
	);
}
