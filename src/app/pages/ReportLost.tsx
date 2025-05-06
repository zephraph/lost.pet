import { RequestInfo } from "rwsdk/worker";
import { Footer } from "../components/Footer";
import { LostPetForm } from "../components/LostPetForm";
import { env } from "cloudflare:workers";

export function ReportLost({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Report a Lost Pet</h1>
        
        <div className="max-w-2xl">
          <LostPetForm mapsApiKey={env.PUBLIC_MAPS_API_KEY} />
        </div>
      </div>
      <Footer />
    </div>
  );
}