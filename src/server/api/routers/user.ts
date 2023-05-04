import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import axios from "axios";
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

  getGitHubProjects: publicProcedure.query(async ({ ctx }) => {

    
    //const response = axios.get()

  }),
});
