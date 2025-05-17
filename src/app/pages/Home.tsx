import { RequestInfo } from "rwsdk/worker";
import { LostPetCarousel } from "../components/LostPetCarousel";
import { Footer } from "../components/Footer";

export function Home({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen">
        {/* Background image container */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/cloud-assets/homepage-bg--mobile.jpg"
            srcSet="/cloud-assets/homepage-bg--offset.jpg 1280w, /cloud-assets/homepage-bg--desktop.jpg 1024w, /cloud-assets/homepage-bg--tablet.jpg 640w, /cloud-assets/homepage-bg--mobile.jpg 320w"
            sizes="100vw"
            alt="Lost pets background"
            className="w-full h-full object-cover xl:object-[calc(30%-0.8vw+250px)_center] lg:object-[calc(22%-1vw-20px)_center]"
            style={{ minHeight: '100%', minWidth: '100%' }}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 text-white">
                  <svg viewBox="0 0 512 512" fill="currentColor">
                    <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-3xl font-bold uppercase tracking-widest leading-none">Lost Pet</h1>
                  <span className="text-xl font-medium uppercase tracking-wider leading-none text-gray-300">Project</span>
                </div>
              </div>

              {/* Header CTAs */}
              <div className="flex items-center -mr-16">
                <div className="flex gap-4">
                  <a
                    href="/report-lost"
                    className="rounded-lg bg-rose-600/90 px-6 py-3 text-lg font-semibold text-white/95 shadow-lg hover:shadow-rose-600/20 hover:bg-rose-700 hover:-translate-y-0.5 hover:scale-102 active:translate-y-0 active:scale-98 transition-all duration-150"
                  >
                    Report Lost Pet
                  </a>
                  <a
                    href="/report-sighting"
                    className="rounded-lg bg-emerald-600/90 px-6 py-3 text-lg font-semibold text-white/95 shadow-lg hover:shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-0.5 hover:scale-102 active:translate-y-0 active:scale-98 transition-all duration-150"
                  >
                    Report Sighting
                  </a>
                </div>
                <div className="ml-4 h-6 w-px bg-white/40" />
                {ctx.user?.name ? (
                  <span className="ml-4 font-medium text-white">
                    {ctx.user.name}
                  </span>
                ) : (
                  <a
                    href="/login"
                    className="ml-4 font-medium text-white hover:text-white/80 transition-colors"
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 pt-16">
            <div className="w-full md:w-full lg:max-w-[60%] [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
              {/* Main Heading */}
              <div className="mb-24">
                <h2 className="mb-6 text-6xl font-bold leading-tight">
                  Help pets find home
                </h2>
                <p className="mb-8 text-xl text-gray-100">
                  A national network for reuniting lost pets with their people—through technology,
                  compassion, and community.
                </p>
              </div>

              {/* Lost Pet Carousel */}
              <LostPetCarousel />
            </div>
          </div>

          {/* Why It Matters Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="w-full md:w-full lg:max-w-[60%] rounded-xl bg-white/10 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-bold">Why It Matters</h3>
              <p className="mb-4 text-xl text-gray-300">
                Every year, millions of pets go missing. Too many never make it home.
              </p>
              <p className="mb-8 text-gray-300">
                We're here to help—with a system built to connect people, speed up sightings,
                and spread the word faster than ever.
              </p>
              {/* <blockquote className="border-l-4 border-white/50 pl-4 text-gray-300">
                <p className="mb-2 italic">
                  "We posted the flyer and within hours someone scanned the code. That scan led us straight to our dog."
                </p>
                <cite className="text-sm">— Marissa G., Brooklyn, NY</cite>
              </blockquote> */}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
