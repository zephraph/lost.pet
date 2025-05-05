import { RequestInfo } from "@redwoodjs/sdk/worker";

export function Donate({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Support Our Mission</h1>
        
        <div className="grid gap-12">
          {/* Impact Section */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-rose-400">Your Impact</h2>
            <p className="mb-8 text-lg text-gray-300">
              Your donation helps us maintain and improve our pet-finding technology, support our 
              volunteer network, and ultimately reunite more lost pets with their families.
            </p>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white/5 p-6 text-center">
                <div className="mb-2 text-2xl font-bold text-emerald-400">$25</div>
                <p className="text-gray-300">Helps distribute 100 digital flyers</p>
              </div>
              <div className="rounded-lg bg-white/5 p-6 text-center">
                <div className="mb-2 text-2xl font-bold text-emerald-400">$50</div>
                <p className="text-gray-300">Supports our 24/7 alert system for a week</p>
              </div>
              <div className="rounded-lg bg-white/5 p-6 text-center">
                <div className="mb-2 text-2xl font-bold text-emerald-400">$100</div>
                <p className="text-gray-300">Funds advanced search coordination tools</p>
              </div>
            </div>
          </section>

          {/* Donation Form */}
          <section className="mx-auto max-w-2xl">
            <h2 className="mb-6 text-2xl font-semibold text-rose-400">Make a Donation</h2>
            <div className="rounded-lg bg-white/5 p-8">
              <form className="space-y-6">
                <div>
                  <label className="mb-2 block font-medium">Amount</label>
                  <div className="grid grid-cols-4 gap-4">
                    <button type="button" className="rounded-lg border border-rose-500 px-6 py-3 font-semibold hover:bg-rose-500/20 transition-colors">
                      $25
                    </button>
                    <button type="button" className="rounded-lg border border-rose-500 px-6 py-3 font-semibold hover:bg-rose-500/20 transition-colors">
                      $50
                    </button>
                    <button type="button" className="rounded-lg border border-rose-500 px-6 py-3 font-semibold hover:bg-rose-500/20 transition-colors">
                      $100
                    </button>
                    <input
                      type="number"
                      placeholder="Custom"
                      className="rounded-lg border border-rose-500 bg-transparent px-4 py-3 font-semibold placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Payment Method</label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-rose-500 px-6 py-3 font-semibold hover:bg-rose-500/20 transition-colors">
                      <span>Credit Card</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-rose-500 px-6 py-3 font-semibold hover:bg-rose-500/20 transition-colors">
                      <span>PayPal</span>
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 transition-colors">
                  Donate Now
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-400">
                The Lost Pet Project is a registered 501(c)(3) nonprofit organization.
                All donations are tax-deductible.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 