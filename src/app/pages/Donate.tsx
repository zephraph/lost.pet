import type { RequestInfo } from "rwsdk/worker";
import { Footer } from "../components/Footer";

export function Donate({ ctx }: RequestInfo) {
	return (
		<div className="min-h-screen bg-[#1C1C1C] text-white">
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="mb-8 text-4xl font-bold">Support Our Mission</h1>

					<div className="rounded-lg bg-white/5 p-8">
						<p className="mb-6 text-lg text-gray-300">
							We're working on setting up our donation system to help support
							our mission of reuniting lost pets with their families.
						</p>
						<p className="text-lg text-gray-300">
							Check back soon to learn how you can contribute.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
