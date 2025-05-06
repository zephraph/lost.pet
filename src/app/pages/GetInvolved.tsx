import { RequestInfo } from "rwsdk/worker";
import { Footer } from "../components/Footer";

export function GetInvolved({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Get Involved</h1>
        
        <div className="grid gap-12">
          {/* Ways to Help Section */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-emerald-400">Ways to Help</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white/5 p-8">
                <h3 className="mb-4 text-xl font-medium">Become a Volunteer</h3>
                <p className="mb-4 text-gray-300">
                  Join our network of dedicated volunteers who help reunite pets with their families.
                  You can help by:
                </p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Monitoring local sightings</li>
                  <li>Coordinating search efforts</li>
                  <li>Distributing flyers</li>
                  <li>Supporting pet owners</li>
                </ul>
                <button className="mt-6 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors">
                  Sign Up as Volunteer
                </button>
              </div>

              <div className="rounded-lg bg-white/5 p-8">
                <h3 className="mb-4 text-xl font-medium">Spread the Word</h3>
                <p className="mb-4 text-gray-300">
                  Help us reach more pet owners and grow our community by:
                </p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Sharing on social media</li>
                  <li>Telling friends and family</li>
                  <li>Connecting with local shelters</li>
                  <li>Following our updates</li>
                </ul>
                <div className="mt-6 flex gap-4">
                  <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors">
                    Share on Twitter
                  </button>
                  <button className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition-colors">
                    Share on Facebook
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Partner Section */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-emerald-400">Partner With Us</h2>
            <div className="rounded-lg bg-white/5 p-8">
              <p className="mb-6 text-gray-300">
                Are you a veterinary clinic, animal shelter, or pet-related business? 
                Partner with us to expand our network and help more pets find their way home.
              </p>
              <button className="rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 transition-colors">
                Become a Partner
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
} 