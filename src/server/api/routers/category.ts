import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(async ({ctx}) => {
            const { prisma } = ctx;
            const categories = await prisma.category.findMany();
            return categories;
        }),
    createCategory: protectedProcedure
        .input(z.object({ name: z.string(), moderatorId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { prisma } = ctx;
            const { name, moderatorId } = input;
            const category = await prisma.category.create({
                data: {
                    name,
                    moderator: {
                        connect: {
                            id: moderatorId,
                        },
                    },
                },
            });
            return category;
        }
    ),
    deleteCategory: protectedProcedure
        .input(z.object({ categoryId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { prisma } = ctx;
            const { categoryId } = input;
            const category = await prisma.category.delete({
                where: {
                    id: categoryId,
                },
            });
            return category;
        }
    ),
});
