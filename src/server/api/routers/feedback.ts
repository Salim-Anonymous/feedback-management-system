import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(async ({ctx}) => {
            const { prisma } = ctx;
            const feedbacks = await prisma.feedback.findMany();
            return feedbacks;
        }
    ),
});
