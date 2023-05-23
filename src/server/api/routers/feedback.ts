import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure,} from "@/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(async ({ctx}) => {
            const { prisma } = ctx;
            const feedbacks = await prisma.feedback.findMany();
            // sort by date
            feedbacks.sort((a, b) => {
                return b.createdAt.getTime() - a.createdAt.getTime();
            });
            return feedbacks;
        }
    ),
    create: protectedProcedure
        .input(z.object({
            subject: z.string() ,
            description: z.string() || z.null(),
            userId: z.string(),
            visibility: z.enum(['ANONYMOUS', 'PUBLIC']),
        }))
        .mutation(async ({ctx, input}) => {
            const { prisma } = ctx;
            if (input.visibility === 'PUBLIC' && input.userId !== "not") {
                return await prisma.feedback.create({
                    data: {
                        subject: input.subject,
                        description: input.description,
                        authorId: input.userId,
                        visibility: input.visibility,
                    }
                });
            } else if (input.visibility === 'ANONYMOUS') {
                return await prisma.feedback.create({
                    data: {
                        subject: input.subject,
                        description: input.description,
                    }
                });
            }
        }
    ),
});
