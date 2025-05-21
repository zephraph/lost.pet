import type { RequestInfo } from "rwsdk/worker";

export function HeaderAuth({ ctx }: RequestInfo) {
	return ctx.user?.name ? (
		<a
			href="/logout"
			className="ml-4 font-medium text-white hover:text-white/80 transition-colors"
		>
			Sign out
		</a>
	) : (
		<a
			href="/login"
			className="ml-4 font-medium text-white hover:text-white/80 transition-colors"
		>
			Sign in
		</a>
	);
}
