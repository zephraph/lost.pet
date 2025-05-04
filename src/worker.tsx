import { defineApp, ErrorResponse } from "@redwoodjs/sdk/worker";
import { route, render, prefix } from "@redwoodjs/sdk/router";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { userRoutes } from "@/app/pages/user/routes";
import { Home } from "@/app/pages/Home";
import { LearnMore } from "@/app/pages/LearnMore";
import { GetInvolved } from "@/app/pages/GetInvolved";
import { Donate } from "@/app/pages/Donate";
import { Pet } from "@/app/pages/Pet";
import { Listings } from "@/app/pages/Listings";
import { ReportLost } from "@/app/pages/ReportLost";
import { ReportSighting } from "@/app/pages/ReportSighting";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";
import { db, setupDb } from "./db";
import type { User } from "@prisma/client";
import { env } from "cloudflare:workers";
export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: User | null;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });
    }
  },
  render(Document, [
    route("/", [Home]),
    route("/learn-more", [LearnMore]),
    route("/get-involved", [GetInvolved]),
    route("/donate", [Donate]),
    route("/pet/:id", [Pet]),
    route("/listings", [Listings]),
    route("/report-lost", [ReportLost]),
    route("/report-sighting", [ReportSighting]),
    prefix("/user", userRoutes),
  ]),
]);
