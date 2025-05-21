import { Footer } from "@/app/components/Footer";
import { SignupForm } from "@/app/components/SignupForm";
import type { RequestInfo } from "rwsdk/worker";

export function Signup({ ctx }: RequestInfo) {
	return (
		<div className="min-h-screen bg-[#1C1C1C] text-white">
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-md">
					<div className="mb-8 text-center">
						<h1 className="mb-2 text-3xl font-bold">Create Account</h1>
						<p className="text-gray-400">
							Sign up to help reunite lost pets with their families
						</p>
					</div>
					<SignupForm />
				</div>
			</div>
			<Footer />
		</div>
	);
} 