import { createTRPCRouter } from "@/server/api/trpc";
import { feedbackRouter } from "@/server/api/routers/feedback";
import {imageRouter} from "@/server/api/routers/image";
import {userRouter} from "@/server/api/routers/user";
import {voteRouter} from "@/server/api/routers/vote";
import {categoryRouter} from "@/server/api/routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    feedback: feedbackRouter,
    image: imageRouter,
    user: userRouter,
    vote: voteRouter,
    category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
