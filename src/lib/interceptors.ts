import type { RouteMiddleware } from "rwsdk/router";

export const redirectIfLoggedIn = (location: string): RouteMiddleware => {
	return ({ ctx }) => {
		if (ctx.user) {
			return new Response("Already logged in; redirecting...", {
				status: 302,
				headers: { Location: location },
			});
		}
	};
};

export const normalizeRoute = (normalizedPath: string): RouteMiddleware => {
	return ({ request }) => {
		const url = new URL(request.url);
		const currentPath = url.pathname;

		// If we're already at the normalized path, do nothing
		if (currentPath === normalizedPath) {
			return;
		}

		// Otherwise, redirect to the normalized path
		return new Response(null, {
			status: 302,
			headers: { Location: normalizedPath },
		});
	};
};
