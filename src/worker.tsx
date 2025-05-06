import { defineApp } from "@redwoodjs/sdk/worker";
import { route, render } from "@redwoodjs/sdk/router";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import { GetInvolved } from "@/app/pages/GetInvolved";
import { Donate } from "@/app/pages/Donate";
import { Pet } from "@/app/pages/Pet";
import { Listings } from "@/app/pages/Listings";
import { ReportLost } from "@/app/pages/ReportLost";
import { ReportSighting } from "@/app/pages/ReportSighting";
import { AboutUs } from "@/app/pages/AboutUs";
import { setupDb } from "./db";
import { env } from "cloudflare:workers";
import { auth } from "./lib/auth";

export type AppContext = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, headers }) => {
    await setupDb(env);
    const session = await auth.api.getSession({ headers });

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
  ]),
]);
