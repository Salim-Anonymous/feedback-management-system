import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  createCategory: adminProcedure
    .input(z.object({ name: z.string(), moderatorId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { name, moderatorId } = input;
      return await prisma.category.create({
        data: {
          name,
          moderator: {
            connect: {
              id: moderatorId,
            },
          },
        },
      });
    }),
  deleteCategory: adminProcedure
    .input(z.object({ categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { categoryId } = input;
      return await prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
    }),
    updateCategory: adminProcedure
    .input(z.object({ categoryId: z.string(), name: z.string(),moderatorId:z.string(),description:z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { categoryId, name } = input;
      return await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name,
          moderator: {
            connect: {
              id: input.moderatorId,
            },
          },
          updatedAt: Date.now().toString(),
          description: input.description,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    return await prisma.category.findMany();
  }),
  getAllCategoriesOfFeedback: publicProcedure
    .input(z.object({ feedbackId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { feedbackId } = input;
      return await prisma.category.findMany({
        where: {
          feedbacks: {
            every: {
              id: feedbackId,
            },
          },
        },
      });
    }),
});
