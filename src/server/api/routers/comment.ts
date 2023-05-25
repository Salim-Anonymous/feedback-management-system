import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const commentsRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        feedbackId: z.string(),
        message: z.string(),
        userId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      if (input.userId !== undefined) {
        return await prisma.comment.create({
          data: {
            authorId: input.userId,
            feedbackId: input.feedbackId,
            message: input.message,
          },
        });
      } else {
        return await prisma.comment.create({
          data: {
            feedbackId: input.feedbackId,
            message: input.message,
          },
        });
      }
    }),
  getAllComments: publicProcedure
    .input(z.object({ feedbackId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const comments = await prisma.comment.findMany({
        where: {
          feedbackId: input.feedbackId,
        },
      });
      // sort by date
      comments.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
      return comments;
    }),
  getCommentCount: publicProcedure
    .input(z.object({ feedbackId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return await prisma.comment.count({
        where: {
          feedbackId: input.feedbackId,
        },
      });
    }),
});
