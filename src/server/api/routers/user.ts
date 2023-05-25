import {z} from "zod";

import {adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure,} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx }) => {
      const { prisma } = ctx;
      const users = await prisma.user.findMany();
      return users;
    }),
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return await prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
    }),
});
