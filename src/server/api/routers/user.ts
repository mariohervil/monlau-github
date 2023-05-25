import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import axios, { type AxiosResponse } from "axios";
import z from "zod";
import type Repository from "~/interfaces/Repository";
export const userRouter = createTRPCRouter({
  getAllProjects: publicProcedure.query(async ({ ctx }) => {
    if (ctx.currentUser?.userId === null) {
      return null;
    }
    const projects = await ctx.prisma.project.findMany({
      where: {
        ownerId: ctx.currentUser?.userId,
      },
    });
    return projects;
  }),

  getGitHubProjects: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const GITHUB_URL_API = `https://api.github.com/users/${input}/repos`;
      const response: AxiosResponse = await axios.get(GITHUB_URL_API, {
        headers: {
          Authorization: `Bearer ${
            process.env?.GITHUB_TOKEN ? process.env?.GITHUB_TOKEN : ""
          }`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      const data: Repository[] = response.data as Repository[];
      return data;
      /* 
 .then((response: AxiosResponse) => {
          const data: Repository = response.data;
          console.log(data);
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
        return null;

      */
    }),

  getUserList: publicProcedure.query(async ({ ctx }) => {
    const userList = await ctx.clerk.users.getUserList({
      limit: 30,
    });
    return userList;
  }),

  getUsernames: publicProcedure.query(async ({ ctx }) => {
    const userList = await ctx.clerk.users.getUserList();

    return userList.map((user) => user.username);
  }),

  getUserInfoByUsername: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const user = await ctx.clerk.users.getUserList();
      return user.find((user) => user.username === input);
    }),

  getDescription: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const description = await ctx.prisma.description.findFirst({
        where: {
          user: input,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return description;
    }),

  insertDescription: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        user: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.text.length > 255) {
        throw new Error("El texto es demasiado largo");
      }

      if (!input.text || input.text === "") {
        throw new Error("El texto está vacío");
      }
      if (ctx.currentUser?.userId === null) {
        return null;
      }
      if (!input) {
        return null;
      }
      const description = await ctx.prisma.description.create({
        data: {
          text: input.text,
          user: input.user,
        },
      });
      return description;
    }),
});
