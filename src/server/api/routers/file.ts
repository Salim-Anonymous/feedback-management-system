import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const fileRouter = createTRPCRouter({
  getFile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return await prisma.files.findMany({
        where: {
          feedbacks: {
            some: {
              id: input.id,
            },
          },
        },
      });
    }),
});
