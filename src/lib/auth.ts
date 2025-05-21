import { env } from "cloudflare:workers";
import { PrismaClient } from "@generated/prisma";
import { PrismaD1 } from "@prisma/adapter-d1";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

const db = new PrismaClient({
	// @ts-expect-error
	adapter: new PrismaD1(env.DB),
});

export const auth = betterAuth({
	basePath: "/auth",
	database: prismaAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		disableSignUp: true,
	},
	plugins: [admin()],
});
