"use server";

import { db } from "@/db";
import { requestInfo } from "rwsdk/worker";

export async function getRecentLostPets() {
	return db.pet.findMany({
		orderBy: { lastSeen: "desc" },
		take: 10, // Limit to 10 most recent pets
	});
}

export async function reportLostPet(formData: FormData) {
	const { ctx } = requestInfo;

	try {
		// Get form data
		const name = formData.get("name") as string;
		const type = formData.get("type") as string;
		const breed = formData.get("breed") as string;
		const lastSeen = new Date(formData.get("lastSeenDate") as string);
		const latitude = Number.parseFloat(formData.get("latitude") as string);
		const longitude = Number.parseFloat(formData.get("longitude") as string);
		const image = formData.get("image") as File;

		// TODO: Handle image upload to a storage service
		const imageUrl = "https://placedog.net/400/400?r"; // Placeholder for now

		// Create pet record
		const pet = await db.pet.create({
			data: {
				name,
				type,
				breed,
				lastSeen,
				latitude,
				longitude,
				image: imageUrl,
			},
		});

		return { ok: true, petId: pet.id };
	} catch (error) {
		return {
			ok: false,
			err: error instanceof Error ? error.message : "Failed to report lost pet",
		};
	}
}

export async function reportPetSighting(formData: FormData) {
	const { ctx } = requestInfo;

	// TODO: Create a PetSighting model and implement sighting functionality
	return { ok: false, err: "Pet sighting functionality not yet implemented" };
}
