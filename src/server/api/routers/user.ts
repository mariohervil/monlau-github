import { clerkClient, sessions } from "@clerk/nextjs/dist/api";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllProjects: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const projects = await opts.ctx.prisma.project.findMany({
        where: {
          ownerId: opts.input,
        },
      });
      return projects;
    }),
});



