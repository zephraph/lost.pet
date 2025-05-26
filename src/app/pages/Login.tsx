import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { LoginForm } from "@/app/components/LoginForm";
import type { RequestInfo } from "rwsdk/worker";

export function Login(requestInfo: RequestInfo) {
	return (
		<div className="min-h-screen bg-[#1C1C1C] text-white">
			<Header />
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-md">
					<div className="mb-8 text-center">
						<h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
						<p className="text-gray-400">Sign in to your account to continue</p>
					</div>
					<LoginForm />
				</div>
			</div>
			<Footer />
		</div>
	);
}
