import type { RequestInfo } from "rwsdk/worker";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeaderAuth } from "../components/HeaderAuth";
import { HeaderCTAs } from "../components/HeaderCTAs";
import { LostPetCarousel } from "../components/LostPetCarousel";

export function Home(requestInfo: RequestInfo) {
	return (
		<div className="min-h-screen bg-[#1C1C1C] text-white">
			{/* Hero Section with Background Image */}
			<div className="relative min-h-screen">
				{/* Background image container */}
				<div className="absolute inset-0 overflow-hidden bg-[url('/cloud-assets/homepage-bg--mobile.jpg')] bg-cover md:bg-left max-md:bg-center bg-no-repeat xl:bg-[url('/cloud-assets/homepage-bg--offset.jpg')] lg:bg-[url('/cloud-assets/homepage-bg--desktop.jpg')] md:bg-[url('/cloud-assets/homepage-bg--tablet.jpg')]" />

				{/* Content */}
				<div className="relative">
					{/* Header */}
					<Header>
						<>
							<HeaderCTAs />
							<div className="ml-4 h-6 w-px bg-white/40" />
							<HeaderAuth {...requestInfo} />
						</>
					</Header>

					{/* Main Content */}
					<div className="container mx-auto px-4 pt-16">
						<div className="w-full md:w-full lg:max-w-[60%] [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
							{/* Main Heading */}
							<div className="mb-24">
								<h2 className="mb-6 text-6xl font-bold leading-tight">
									Helping lost pets find home
								</h2>
								<p className="mb-8 text-xl text-gray-100">
									A national network for reuniting lost pets with their
									people—through technology, compassion, and community.
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
								Every year, millions of pets go missing. Too many never make it
								home.
							</p>
							<p className="mb-8 text-gray-300">
								We're here to help—with a system built to connect people, speed
								up sightings, and spread the word faster than ever.
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
