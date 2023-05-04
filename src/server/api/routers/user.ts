import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import axios, { AxiosResponse } from "axios";
import z from "zod";
import Repository from "~/interfaces/Repository";
export const userRouter = createTRPCRouter({
  getAllProjects: publicProcedure.query(async ({ ctx }) => {
    if (ctx.currentUser?.userId === null) {
      return null;
    }
    console.log("object");
    console.log(ctx.currentUser.user?.externalAccounts[0]?.emailAddress);
    const projects = await ctx.prisma.project.findMany({
      where: {
        ownerId: ctx.currentUser?.userId,
      },
    });
    return projects;
  }),

  getGitHubProjects: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
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
    const userList = await ctx.clerk.users.getUserList();
    return userList;
  }),
});
