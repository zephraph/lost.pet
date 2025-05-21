import { env } from "cloudflare:workers";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { AboutUs } from "@/app/pages/AboutUs";
import { Donate } from "@/app/pages/Donate";
import { GetInvolved } from "@/app/pages/GetInvolved";
import { Home } from "@/app/pages/Home";
import { Listings } from "@/app/pages/Listings";
import { Login } from "@/app/pages/Login";
import { Pet } from "@/app/pages/Pet";
import { ReportLost } from "@/app/pages/ReportLost";
import { ReportSighting } from "@/app/pages/ReportSighting";
import { prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Signup } from "./app/pages/Signup";
import { cloudAssetRoutes } from "./app/pages/cloud-assets";
import { setupDb } from "./db";
import { auth } from "./lib/auth";
import { normalizeRoute, redirectIfLoggedIn } from "./lib/interceptors";

export type AppContext = {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
};

export default defineApp([
	setCommonHeaders(),
	async ({ ctx, request }) => {
		await setupDb(env);
		const session = await auth.api.getSession({ headers: request.headers });

		if (!session) {
			ctx.user = null;
			ctx.session = null;
		} else {
			ctx.user = session.user;
			ctx.session = session.session;
		}
	},
	render(Document, [
		route("/", [Home]),
		route("/get-involved", [GetInvolved]),
		route("/donate", [Donate]),
		route("/pet/:id", [Pet]),
		route("/listings", [Listings]),
		route("/report-lost", [ReportLost]),
		route("/report-sighting", [ReportSighting]),
		route("/about", [AboutUs]),
		route("/(login|signin|sign-in)", [
			redirectIfLoggedIn("/"),
			normalizeRoute("/login"),
			Login,
		]),
		route("/(signup|sign-up)", [
			redirectIfLoggedIn("/"),
			normalizeRoute("/signup"),
			Signup,
		]),
		route("/auth/*", (ctx) => {
			return auth.handler(ctx.request);
		}),
		route("/logout", async ({ request }) => {
			// Clear the session
			await auth.api.signOut({ headers: request.headers });

			// Redirect to home page
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/",
				},
			});
		}),
		prefix("/cloud-assets", cloudAssetRoutes),
	]),
]);
