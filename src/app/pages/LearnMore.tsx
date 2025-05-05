import { RequestInfo } from "@redwoodjs/sdk/worker";

export function LearnMore({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Learn More About Lost Pet Project</h1>
        
        <div className="grid gap-12">
          {/* Mission Section */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-rose-400">Our Mission</h2>
            <p className="text-lg text-gray-300">
              The Lost Pet Project is dedicated to revolutionizing how we reunite lost pets with their families. 
              Through innovative technology and community engagement, we're building a nationwide network that 
              makes pet recovery faster and more efficient than ever before.
            </p>
          </section>

          {/* How It Works Section */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-rose-400">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-medium">Report</h3>
                <p className="text-gray-300">
                  Quickly report lost pets or sightings through our intuitive platform.
                </p>
              </div>
              <div className="rounded-lg bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-medium">Connect</h3>
                <p className="text-gray-300">
                  Our system automatically matches lost pet reports with sightings in the area.
                </p>
              </div>
              <div className="rounded-lg bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-medium">Reunite</h3>
                <p className="text-gray-300">
                  Get real-time notifications and support throughout the reunion process.
                </p>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-rose-400">Our Impact</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">90%</div>
                <p className="text-gray-300">Success rate for reported cases</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">24h</div>
                <p className="text-gray-300">Average reunion time</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">50k+</div>
                <p className="text-gray-300">Pets reunited</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 