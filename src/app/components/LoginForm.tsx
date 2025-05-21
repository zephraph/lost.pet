"use client";

import { authClient } from "@/lib/authClient";
import { useState } from "react";

export function LoginForm() {
	const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
	const [error, setError] = useState<string | null>(null);

	async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("loading");
		setError(null);

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const rememberMe = formData.get("rememberMe") === "on";

		try {
			const result = await authClient.signIn.email({
				email,
				password,
				callbackURL: "/",
				rememberMe,
			});

			if (result.data?.token && result.data.user) {
				window.location.href = "/";
			} else {
				setStatus("error");
				setError("Invalid email or password");
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
			<form onSubmit={handleLogin} className="space-y-6">
				{error && (
					<div className="rounded-lg bg-rose-500/10 p-4 text-rose-400">
						{error}
					</div>
				)}

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
						placeholder="Enter your password"
					/>
				</div>

				<div className="flex items-center">
					<input
						id="rememberMe"
						name="rememberMe"
						type="checkbox"
						defaultChecked={true}
						className="h-4 w-4 rounded border-gray-600 bg-black/20 text-rose-600 focus:ring-rose-500"
					/>
					<label
						htmlFor="rememberMe"
						className="ml-2 block text-sm text-gray-300"
					>
						Remember me
					</label>
				</div>

				<button
					type="submit"
					disabled={status === "loading"}
					className="w-full rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					{status === "loading" ? "Signing in..." : "Sign in"}
				</button>
			</form>

			<div className="mt-6 text-center text-sm text-gray-400">
				Don't have an account?{" "}
				<a
					href="/signup"
					className="text-rose-400 hover:text-rose-300 transition-colors"
				>
					Sign up
				</a>
			</div>
		</div>
	);
}
