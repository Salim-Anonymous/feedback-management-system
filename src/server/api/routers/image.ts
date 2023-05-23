import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure,} from "@/server/api/trpc";

export const imageRouter = createTRPCRouter({
    getImagesForFeedback: publicProcedure
        .input(z.object({ feedbackId: z.string() }))
        .query(async ({ctx, input}) => {
            const { prisma } = ctx;
            return await prisma.image.findMany({
                where: {
                    feedbackId: input.feedbackId
                }
            });
        }),
    createFeedbackImage: protectedProcedure
        .input(z.object({
            url: z.string(),
            type: z.enum(['FEEDBACK', 'COMMENT']),
            feedbackId: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            const { prisma } = ctx;
            return await prisma.image.create({
                data: {
                    url: input.url,
                    type: input.type,
                    feedbackId: input.feedbackId,
                }
            });
        }),
    createCommentImage: protectedProcedure
        .input(z.object({
            url: z.string(),
            type: z.enum(['FEEDBACK', 'COMMENT']),
            commentId: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            const { prisma } = ctx;
            return await prisma.image.create({
                data: {
                    url: input.url,
                    type: input.type,
                    commentId: input.commentId,
                }
            });
        }),
});
