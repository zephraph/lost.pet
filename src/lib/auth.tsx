import { env } from "cloudflare:workers";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
import VerificationEmail from "@/emails/VerificationEmail";
import { PrismaClient } from "@generated/prisma";
import { PrismaD1 } from "@prisma/adapter-d1";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, magicLink } from "better-auth/plugins";
import resend from "./resend";

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
	plugins: [
		admin(),
		magicLink({
			async sendMagicLink({ email, url }) {
				await resend.emails.send({
					from: "noreply@lost.pet",
					to: email,
					subject: "Sign in to The Lost Pet Project",
					react: MagicLinkEmail({ magicLink: url }),
				});
			},
		}),
	],
	emailVerification: {
		async sendVerificationEmail({ user, url }) {
			await resend.emails.send({
				from: "noreply@lost.pet",
				to: user.email,
				subject: "Verify your email address",
				react: VerificationEmail({ verificationUrl: url, username: user.name }),
			});
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 60 * 60 * 5, // 5 hours
	},
});
