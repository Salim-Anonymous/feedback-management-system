import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        subject: z.string(),
        description: z.string().optional(),
        userId: z.string().optional(),
        visibility: z.enum(["ANONYMOUS", "PUBLIC"]),
        categoryIds: z.array(z.string()),
        files: z.array(z.object({ url: z.string(),id:z.string() })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      if (input.visibility === "ANONYMOUS") {
        const [feedback] = await prisma.$transaction([
          prisma.files.createMany({
            data: input.files,
          }),
          prisma.feedback.create({
            data: {
              subject: input.subject,
              description: input.description,
              visibility: input.visibility,
              category: {
                connect: input.categoryIds.map((id) => ({ id })),
              },
              files: {
                connect: input.files.map((file) => ({ id: file.id })),
              },
            },
          }),
        ]);
        return feedback;
      }
      const [feedback] = await prisma.$transaction([
        prisma.files.createMany({
          data: input.files,
        }),
        prisma.feedback.create({
          data: {
            subject: input.subject,
            description: input.description,
            visibility: input.visibility,
            category: {
              connect: input.categoryIds.map((id) => ({ id })),
            },
            files: {
              connect: input.files.map((file) => ({ id: file.id })),
            },
            author: {
              connect: {
                id: input.userId,
              },
            },
          },
        }),
      ]);
      return feedback;
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const { prisma } = ctx;
      const feedbacks = await prisma.feedback.findMany();
      feedbacks.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
      return feedbacks;
    }),
    getHotFeedbacks: publicProcedure
    .query(async ({ ctx }) => {
      const { prisma } = ctx;
      const feedbacks = await prisma.feedback.findMany();
      const filtered = feedbacks.filter(async(feedback) => {
        const passed = await prisma.like.findMany({
          where: {
            feedbackId: feedback.id,
          }})
        return passed.length > 10;
      });
      return filtered;
    }),
    delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const [likes,feedback] = await prisma.$transaction([
        prisma.like.deleteMany({
          where: {
            feedbackId: input.id,
          },
        }),
        prisma.feedback.delete({
          where: {
            id: input.id,
          },
        }),
      ]);
      return feedback;
    }),
});
