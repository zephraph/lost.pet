import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { HeaderAuth } from "@/app/components/HeaderAuth";
import { SignupForm } from "@/app/components/SignupForm";
import { IS_DEV } from "rwsdk/constants";
import type { RequestInfo } from "rwsdk/worker";

export function Signup(requestInfo: RequestInfo) {
	return (
		<div className="min-h-screen bg-[#1C1C1C] text-white">
			<Header />
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-md">
					<div className="mb-8 text-center">
						<h1 className="mb-2 text-3xl font-bold">Create Account</h1>
						<p className="text-gray-400">
							Sign up to help reunite lost pets with their families
						</p>
					</div>
					{IS_DEV ? (
						<SignupForm />
					) : (
						<div className="rounded-lg bg-yellow-500/10 p-6 text-center">
							<h2 className="mb-2 text-xl font-semibold text-yellow-400">
								🚧 Under Construction 🚧
							</h2>
							<p className="text-gray-300">
								We're still working on getting everything ready. Signups will be
								available soon!
							</p>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}
