import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const reportRouter = createTRPCRouter({
  getReportCountForFeedback: publicProcedure
    .input(z.object({ feedbackId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return await prisma.report.findMany({
        where: {
          feedbackId: input.feedbackId,
        },
      });
    }),
  report: protectedProcedure
    .input(
      z.object({
        feedbackId: z.string(),
        userId: z.string() || z.null() || z.undefined(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return await prisma.report.create({
        data: {
          feedbackId: input.feedbackId,
          authorId: input.userId,
          message: input.message,
        },
      });
    }),
  deleteReport: protectedProcedure
    .input(z.object({ reportId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return await prisma.report.delete({
        where: {
          id: input.reportId,
        },
      });
    }),
  getFeedbackReportCount: protectedProcedure
    .input(z.object({ feedbackId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const count =  await prisma.report.count({
        where: {
          feedbackId: input.feedbackId,
        },
      });
      if (count === 0 || count === undefined || count === null) {
        return {count: 0};
      }
      return {count};
    }
  ),
  checkIfUserHasReportedFeedback: protectedProcedure
    .input(z.object({ feedbackId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const count =  await prisma.report.findFirst({
        where: {
          feedbackId: input.feedbackId,
          authorId: input.userId,
        },
      });
      return {
        hasReported: count !== null,
      };
    }),
    createReport: protectedProcedure
    .input(z.object({ feedbackId: z.string(), userId: z.string(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return await prisma.report.create({
        data: {
          feedbackId: input.feedbackId,
          authorId: input.userId,
          message: input.message,
        },
      });
    }),
});
