import { defineScript } from "@redwoodjs/sdk/worker";
import { db, setupDb } from "@/db";

export default defineScript(async ({ env }) => {
  setupDb(env);

  await db.$executeRawUnsafe(`\
    DELETE FROM User;
    DELETE FROM Pet;
    DELETE FROM sqlite_sequence;
  `);

  await db.user.create({
    data: {
      id: "1",
      username: "testuser",
    },
  });

  // Seed pets data
  const petsData = [
    {
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      lastSeen: 'Brooklyn, NY',
      date: new Date('2024-03-20'),
      image: 'https://placedog.net/400/400?r',
      latitude: 40.6782,
      longitude: -73.9442,
    },
    {
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese',
      lastSeen: 'Queens, NY',
      date: new Date('2024-03-19'),
      image: 'https://placecats.com/400/400',
      latitude: 40.7282,
      longitude: -73.7949,
    },
    {
      name: 'Charlie',
      type: 'Dog',
      breed: 'French Bulldog',
      lastSeen: 'Manhattan, NY',
      date: new Date('2024-03-18'),
      image: 'https://placedog.net/401/401?r',
      latitude: 40.7831,
      longitude: -73.9712,
    },
    {
      name: 'Bella',
      type: 'Dog',
      breed: 'Labrador',
      lastSeen: 'Bronx, NY',
      date: new Date('2024-03-17'),
      image: 'https://placedog.net/402/402?r',
      latitude: 40.8448,
      longitude: -73.8648,
    },
    {
      name: 'Oliver',
      type: 'Cat',
      breed: 'Persian',
      lastSeen: 'Staten Island, NY',
      date: new Date('2024-03-16'),
      image: 'https://placecats.com/401/401',
      latitude: 40.5795,
      longitude: -74.1502,
    },
  ];

  for (const pet of petsData) {
    await db.pet.create({ data: pet });
  }

  console.log("🌱 Finished seeding");
});
