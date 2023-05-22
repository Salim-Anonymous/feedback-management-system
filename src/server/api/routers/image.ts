import {z} from "zod";

import {createTRPCRouter, publicProcedure,} from "@/server/api/trpc";

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
});
