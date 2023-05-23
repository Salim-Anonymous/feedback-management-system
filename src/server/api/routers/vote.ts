import {z} from "zod";

import {createTRPCRouter, publicProcedure,protectedProcedure} from "@/server/api/trpc";

export const voteRouter = createTRPCRouter({
    getVoteCountForFeedback: publicProcedure
        .input(z.object({ feedbackId: z.string() }))
        .query(async ({ctx, input}) => {
            const { prisma } = ctx;
            const upvotes = await prisma.vote.count({
                where: {
                    feedbackId: input.feedbackId,
                    type: "UPVOTE"
                }
            });
            const downvotes = await prisma.vote.count({
                where: {
                    feedbackId: input.feedbackId,
                    type: "DOWNVOTE"
                }
            });
            return {
                upvotes,
                downvotes
            }
        }),
    checkIfUserHasVoted: protectedProcedure
        .input(z.object({ feedbackId: z.string(), userId: z.string()||z.null()}))
        .query(async ({ctx, input}) => {
            if (input.userId === null) {
                input.userId = "";
            }
            console.log(input.userId)
            const { prisma } = ctx;
            const voted = await prisma.vote.findFirst({
                where: {
                    authorId: input.userId,
                    feedbackId: input.feedbackId
                },
            });
            console.log(voted)
            // if voted is null, then the user has not voted
            return {
                hasVoted: voted !== null,
                voteType: voted?.type
            }
        }),
    upvote: protectedProcedure
        .input(z.object({ feedbackId: z.string(), userId: z.string() || z.null() || z.undefined() }))
        .mutation(async ({ctx, input}) => {
            if (input.userId === null || input.userId === undefined) {
                return null;
            }
            const { prisma } = ctx;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const vote = await prisma.vote.findFirst({
                where: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    authorId: input.userId,
                    feedbackId: input.feedbackId
                },
                select: {
                    id: true,
                }
            });
            if (vote !== null) {
                return await prisma.vote.update({
                    where: {
                        id: vote.id
                    },
                    data: {
                        type: "UPVOTE"
                    }
                });
            }else {
                return await prisma.vote.create({
                    data: {
                        type: "UPVOTE",
                        authorId: input.userId,
                        feedbackId: input.feedbackId
                    }
                });
            }
        }),
    downvote: protectedProcedure
        .input(z.object({ feedbackId: z.string(), userId: z.string() }))
        .mutation(async ({ctx, input}) => {
            const { prisma } = ctx;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const vote = await prisma.vote.findFirst({
                where: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    authorId: input.userId,
                    feedbackId: input.feedbackId
                },
                select: {
                    id: true,
                }
            });
            if (vote !== null) {
                return await prisma.vote.update({
                    where: {
                        id: vote.id
                    },
                    data: {
                        type: "DOWNVOTE"
                    }
                });
            } else {
                return await prisma.vote.create({
                    data: {
                        type: "DOWNVOTE",
                        authorId: input.userId,
                        feedbackId: input.feedbackId
                    }
                });
            }
        }),
});
