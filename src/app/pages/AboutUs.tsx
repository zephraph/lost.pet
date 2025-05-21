import type { RequestInfo } from "rwsdk/worker";
import { Footer } from "../components/Footer";

export function AboutUs({ ctx }: RequestInfo) {
	return (
		<div className="min-h-screen bg-[#1C1C1C] text-white">
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-2xl">
					<h1 className="mb-8 text-4xl font-bold">
						Why Lost Pet Project Exists
					</h1>

					<div className="space-y-6 text-lg text-gray-300">
						<p>
							Hi, I'm Justin. In 2016, while living in Knoxville, Tennessee, my
							cat Oz slipped out when my roommate left the door open.
						</p>

						<p>
							I'll never forget the panic and helplessness of that moment. Every
							minute feels like an eternity, and you'd do anything to get them
							back. I found an online service that would help run ads in my
							area, but the service was costly and felt exploitive.
						</p>

						<p>
							Though I eventually found Oz that time, he escaped again months
							later. Despite all my efforts—late nights searching, countless
							posters, endless worry—he never came home. That loss still sits
							with me today.
						</p>

						<p>
							Now I'm in Brooklyn, NY, where lost pet posters tell similar
							stories on every corner. Behind each one is someone going through
							that same fear and heartache. But I've also seen how neighborhoods
							come together to help find lost pets—sharing sightings, checking
							security cameras, keeping an eye out during their daily walks.
						</p>

						<p className="text-rose-400 font-semibold">
							That's why I'm creating the Lost Pet Project. Because when a pet
							is lost, we should all be able to help each other, without
							barriers or profit motives getting in the way.
						</p>

						<div className="mt-12 rounded-lg bg-white/5 p-6">
							<p className="italic">
								The mission is simple: bring communities together to help
								reunite lost pets with their families. The tools and support you
								need to find your pet will always be free and accessible. I
								believe in building sustainable solutions where your pet's safe
								return is the only metric that matters.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
