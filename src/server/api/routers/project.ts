import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import clerkClient, { type User } from "@clerk/clerk-sdk-node";
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
        orderBy: [
          {
            priority: "asc",
          },
          {
            pinned: "desc",
          },
        ],
      });
      return projects;
    }),

  getPinnedProjectsByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const projects = await ctx.prisma.project.findMany({
        where: {
          ownerId: input,
          pinned: true,
        },
        orderBy: [
          {
            priority: "asc",
          },
          {
            pinned: "desc",
          },
        ],
      });
      return projects;
    }),

  inserProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        url: z.string().url(),
        priority: z.number(),
        pinned: z.boolean(),
        imageUrl: z.string().url(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, description, url, priority, pinned } = input;
      if (!ctx.currentUser?.userId) throw new Error("Not logged in");
      const projects = await ctx.prisma.project.create({
        data: {
          name,
          description,
          url,
          priority,
          pinned,
          ownerId: ctx.currentUser?.userId,
          imageUrl: input.imageUrl,
        },
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
