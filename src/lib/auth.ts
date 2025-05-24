import { db } from "@/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: "sqlite", // or "mysql", "postgresql", ...etc
	}),
	plugins: [admin()],
});
