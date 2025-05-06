"use client";

import { useState } from "react";
import LocationMap from "./LocationMap";
import { reportLostPet } from "../rpc/pets";

type LostPetFormProps = {
  mapsApiKey: string;
};

export function LostPetForm({ mapsApiKey }: LostPetFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  async function handleAction(formData: FormData) {
    setStatus('submitting');
    setError(null);
    
    const result = await reportLostPet(formData);
    
    if (result.ok) {
      setStatus('success');
      // Navigate to the pet's page
      window.location.href = `/pet/${result.petId}`;
    } else {
      setStatus('error');
      setError(result.err || 'An unexpected error occurred');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-emerald-500/10 p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-emerald-400">Report Submitted Successfully</h2>
        <p className="text-gray-300">Redirecting to your pet's listing page...</p>
      </div>
    );
  }

  return (
    <form
      action={handleAction}
      className="grid gap-6 rounded-xl bg-white/5 p-8"
    >
      {status === 'error' && error && (
        <div className="rounded-lg bg-rose-500/10 p-4 text-rose-400">
          <p>{error}</p>
        </div>
      )}

      {/* Pet Information */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-rose-400">Pet Information</h2>
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block font-medium">Pet's Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
              placeholder="e.g. Max"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Type of Pet</label>
              <select
                name="type"
                required
                className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
              >
                <option value="">Select type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Breed</label>
              <input
                type="text"
                name="breed"
                required
                className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                placeholder="e.g. Golden Retriever"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Upload Photo</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-rose-600 file:px-4 file:py-2 file:text-white hover:file:bg-rose-700"
            />
          </div>
        </div>
      </div>

      {/* Last Seen Information */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-rose-400">Last Seen Information</h2>
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block font-medium">Location</label>
            <input
              required
              type="text"
              id="lastSeen"
              className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
              placeholder="Enter or select location on map"
            />
            <input type="hidden" id="latitude" name="latitude" />
            <input type="hidden" id="longitude" name="longitude" />
            <p className="mt-2 text-sm text-gray-400">For privacy, we only store the coordinates of this location, not the address.</p>
          </div>

          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <LocationMap 
              for="lastSeen"
              latitudeId="latitude"
              longitudeId="longitude"
              defaultLocation={{ lat: 40.7128, lng: -74.0060 }}
              apiKey={mapsApiKey}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Date Last Seen</label>
            <input
              type="datetime-local"
              name="date"
              required
              defaultValue={getCurrentDateTime()}
              max={getCurrentDateTime()}
              className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
} 