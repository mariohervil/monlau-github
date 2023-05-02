import { clerkClient, sessions } from "@clerk/nextjs/dist/api";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllProjects: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const projects = await ctx.prisma.project.findMany({
        where: {
          ownerId: input,
        },
      });
      return projects;
    }),
});
