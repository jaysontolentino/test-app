import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { appRouter } from "./router/index.js";
import { cors } from "hono/cors";
import { db } from "./lib/db.js";

const app = new Hono();
app.use(cors());
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, c) => ({
      // c is the hono context
      db: db,
    }),
  })
);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Hone Server is running on http://localhost:${info.port}`);
  }
);
