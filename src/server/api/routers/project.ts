import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import clerkClient, { type User } from "@clerk/clerk-sdk-node";
import { Project } from "@prisma/client";
const filterUsersForClient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany();
    const users = (
      await clerkClient.users.getUserList({
        userId: projects.map((project) => project.ownerId),
        limit: 40,
      })
    ).map(filterUsersForClient);

    return projects.map((project) => {
      return {
        ...project,
        owner: users.find((user) => user.id === project.ownerId),
      };
    });
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

  inserProject: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        url: z.string(),
        priority: z.number(),
        ownerId: z.string(),
        pinned: z.boolean(),
      })
    )
    .query(async ({ input, ctx }) => {
      const projects = await ctx.prisma.project.create({
        data: input,
      });
      return projects;
    }),
});


/*
export type Project = {
  id: string
  name: string
  description: string | null
  url: string | null
  priority: number | null
  ownerId: string
  pinned: boolean | null
  createdAt: Date
  updatedAt: Date
}
*/