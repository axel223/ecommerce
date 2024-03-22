import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ input, ctx}) => {
    return db.category.findMany();
  }),
});
