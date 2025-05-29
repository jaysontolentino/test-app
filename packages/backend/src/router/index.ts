import { trpc } from "../lib/trpc.js";
import { taskRouter } from "./taskRouter.js";

export const appRouter = trpc.router({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
