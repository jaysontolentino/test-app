import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { appRouter } from "./router/index.js";
import { cors } from "hono/cors";

const app = new Hono();
app.use(cors());
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
