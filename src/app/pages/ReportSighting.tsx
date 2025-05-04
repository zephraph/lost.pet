import { RequestInfo } from "@redwoodjs/sdk/worker";
import { reportPetSighting } from "../rpc/pets";

export function ReportSighting({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Report a Pet Sighting</h1>
        
        <div className="max-w-2xl">
          <form
            action={reportPetSighting}
            className="grid gap-6 rounded-xl bg-white/5 p-8"
          >
            {/* Pet Information */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-emerald-400">Pet Description</h2>
              <div className="grid gap-6">
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
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">Breed (if known)</label>
                    <input
                      type="text"
                      name="breed"
                      className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                      placeholder="e.g. Golden Retriever"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Upload Photo (if available)</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-white hover:file:bg-emerald-700"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Additional Details</label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                    placeholder="Describe any distinguishing features, behavior, collar/tags, etc."
                  />
                </div>
              </div>
            </div>

            {/* Sighting Information */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-emerald-400">Sighting Information</h2>
              <div className="grid gap-6">
                <div>
                  <label className="mb-2 block font-medium">Location Description</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                    placeholder="e.g. Central Park, near the lake"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-medium">Latitude</label>
                    <input
                      type="number"
                      name="latitude"
                      step="any"
                      required
                      className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                      placeholder="e.g. 40.7829"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">Longitude</label>
                    <input
                      type="number"
                      name="longitude"
                      step="any"
                      required
                      className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                      placeholder="e.g. -73.9654"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Date & Time of Sighting</label>
                  <input
                    type="datetime-local"
                    name="date"
                    required
                    className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-emerald-400">Your Contact Information</h2>
              <div className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-medium">Name</label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">Phone</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    required
                    className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              Submit Sighting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 