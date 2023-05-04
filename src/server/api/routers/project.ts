import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany();
    return projects;
  }),

  getByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const projects = await ctx.prisma.project.findMany({
        where: {
          ownerId: input,
        },
        orderBy: {
          pinned: "desc",
          priority: "asc",
        },
      });
      return projects;
    }),
});
