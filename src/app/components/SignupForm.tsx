"use client";

import { authClient } from "@/lib/authClient";
import { useState } from "react";

export function SignupForm() {
	const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
	const [error, setError] = useState<string | null>(null);

	async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("loading");
		setError(null);

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;
		const name = formData.get("name") as string;

		if (password !== confirmPassword) {
			setStatus("error");
			setError("Passwords do not match");
			return;
		}

		try {
			const result = await authClient.signUp.email({
				email,
				password,
				name,
			});

			if (result.data?.token && result.data.user) {
				window.location.href = "/";
			} else {
				setStatus("error");
				setError(result.error?.message || "Failed to create account");
			}
		} catch (err: unknown) {
			setStatus("error");
			setError(
				err instanceof Error ? err.message : "An unexpected error occurred",
			);
		}
	}

	return (
		<div className="rounded-xl bg-black/20 p-8">
			<form onSubmit={handleSignup} className="space-y-6">
				{error && (
					<div className="rounded-lg bg-rose-500/10 p-4 text-rose-400">
						{error}
					</div>
				)}

				<div>
					<label htmlFor="name" className="mb-2 block font-medium">
						Full Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
						placeholder="Enter your full name"
					/>
				</div>

				<div>
					<label htmlFor="email" className="mb-2 block font-medium">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
						placeholder="Enter your email"
					/>
				</div>

				<div>
					<label htmlFor="password" className="mb-2 block font-medium">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
						placeholder="Create a password"
					/>
				</div>

				<div>
					<label htmlFor="confirmPassword" className="mb-2 block font-medium">
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						required
						className="w-full rounded-lg border border-gray-600 bg-black/20 px-4 py-2 text-white"
						placeholder="Confirm your password"
					/>
				</div>

				<button
					type="submit"
					disabled={status === "loading"}
					className="w-full rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					{status === "loading" ? "Creating account..." : "Create account"}
				</button>
			</form>

			<div className="mt-6 text-center text-sm text-gray-400">
				Already have an account?{" "}
				<a
					href="/login"
					className="text-rose-400 hover:text-rose-300 transition-colors"
				>
					Sign in
				</a>
			</div>
		</div>
	);
}
