import { initTRPC } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import { db } from "./db.js";

type HonoContext = {
  db: PrismaClient;
};

// initialize trpc
export const trpc = initTRPC.context<HonoContext>().create();
