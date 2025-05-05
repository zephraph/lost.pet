"use server";

import { db } from '@/db';
import { requestInfo } from "@redwoodjs/sdk/worker";

export async function getRecentLostPets() {
  return db.pet.findMany({
    orderBy: { date: 'desc' },
    take: 10, // Limit to 10 most recent pets
  });
}

export async function reportLostPet(formData: FormData) {
  const { ctx } = requestInfo;

  // Get form data
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const breed = formData.get('breed') as string;
  const lastSeen = formData.get('lastSeen') as string;
  const date = new Date(formData.get('date') as string);
  const latitude = parseFloat(formData.get('latitude') as string);
  const longitude = parseFloat(formData.get('longitude') as string);
  const image = formData.get('image') as File;

  // TODO: Handle image upload to a storage service
  const imageUrl = 'https://placedog.net/400/400?r'; // Placeholder for now

  // Create pet record
  const pet = await db.pet.create({
    data: {
      name,
      type,
      breed,
      lastSeen,
      date,
      latitude,
      longitude,
      image: imageUrl,
    },
  });

  // Redirect to the pet's page
  return Response.redirect(`/pet/${pet.id}`);
}

export async function reportPetSighting(formData: FormData) {
  const { ctx } = requestInfo;

  // TODO: Create a PetSighting model and implement sighting functionality
  // For now, we'll just redirect back to the home page
  return Response.redirect('/');
} 