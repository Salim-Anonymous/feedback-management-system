import { createTRPCRouter } from "@/server/api/trpc";
import { feedbackRouter } from "@/server/api/routers/feedback";
import { userRouter } from "@/server/api/routers/user";
import { voteRouter } from "@/server/api/routers/vote";
import { categoryRouter } from "@/server/api/routers/category";
import { commentsRouter } from "@/server/api/routers/comment";
import { likeRouter } from "@/server/api/routers/like";
import { fileRouter } from "@/server/api/routers/file";
import { reportRouter } from "./routers/report";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  category: categoryRouter,
  comment: commentsRouter,
  feedback: feedbackRouter,
  like: likeRouter,
  user: userRouter,
  vote: voteRouter,
  file: fileRouter,
  report: reportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
