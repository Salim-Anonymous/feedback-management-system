import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const likeRouter = createTRPCRouter({
  checkIfUserHasLiked: protectedProcedure
    .input(z.object({ feedbackId: z.string(), userId: z.string() || z.null() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const liked = await prisma.like.findFirst({
        where: {
          authorId: input.userId,
          feedbackId: input.feedbackId,
        },
      });
      // if liked is null, then the user has not liked
      return {
        hasLiked: liked !== null,
      };
    }),
  getLikeCountForFeedback: publicProcedure
    .input(z.object({ feedbackId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const count =  await prisma.like.count({
        where: {
          feedbackId: input.feedbackId,
        },
      });
      return {
        count,
      }
    }),
  likeOrUnlike: protectedProcedure
    .input(
      z.object({
        feedbackId: z.string(),
        userId: z.string() || z.null() || z.undefined(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userId === null || input.userId === undefined) {
        return null;
      }
      const { prisma } = ctx;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const like = await prisma.like.findFirst({
        where: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          authorId: input.userId,
          feedbackId: input.feedbackId,
        },
      });
      if (like) {
        await prisma.like.delete({
          where: {
            id: like.id,
          },
        });
      } else {
        await prisma.like.create({
          data: {
            authorId: input.userId,
            feedbackId: input.feedbackId,
          },
        });
      }
    }),
});
