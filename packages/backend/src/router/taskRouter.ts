import { z } from "zod";
import { trpc } from "../lib/trpc.js";
import { TRPCError } from "@trpc/server";

export const taskRouter = trpc.router({
  list: trpc.procedure.query(async ({ ctx }) => {
    try {
      const tasks = await ctx.db.task.findMany();
      return tasks;
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  createTask: trpc.procedure
    .input(
      z.object({
        task: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const newTask = await ctx.db.task.create({
          data: {
            task: input.task,
          },
        });

        return newTask;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
