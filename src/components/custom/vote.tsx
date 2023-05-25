// noinspection TypeScriptValidateTypes

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { api } from "@/utils/api";

type Props = {
  id: string;
  uuid: string | undefined | null;
};
const Vote = ({ id, uuid }: Props) => {
  const { data: voted } = api.vote.checkIfUserHasVoted
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .useQuery({ userId: uuid, feedbackId: id });
  const { data: votes } = api.vote.getVoteCountForFeedback.useQuery({
    feedbackId: id,
  });
  const upvote = api.vote.upvote.useMutation({
    onSuccess: () => {
      void ctx.vote.getVoteCountForFeedback.invalidate();
      void ctx.vote.checkIfUserHasVoted.invalidate();
    },
  });
  const downvote = api.vote.downvote.useMutation({
    onSuccess: () => {
      void ctx.vote.getVoteCountForFeedback.invalidate();
      void ctx.vote.checkIfUserHasVoted.invalidate();
    },
  });
  const ctx = api.useContext();

  return (
    <div className="my-1 flex w-full flex-row items-center justify-evenly gap-4">
      <div
        className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-md px-2 py-1 ${
          voted?.hasVoted && voted?.voteType === "UPVOTE"
            ? " text-green-500"
            : ""
        }`}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          upvote.mutate({ feedbackId: id, userId: uuid });
        }}
      >
        <ArrowUpIcon className="h-4 w-4" />
        <p className={`text-xs `}>{votes?.upvotes}</p>
      </div>
      <div
        className={`flex w-1/2 flex-row items-center justify-center gap-2 px-2 py-1 ${
          voted?.hasVoted && voted?.voteType === "DOWNVOTE"
            ? " text-red-500"
            : ""
        }`}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          downvote.mutate({ feedbackId: id, userId: uuid });
          void ctx.vote.getVoteCountForFeedback.invalidate();
          void ctx.vote.checkIfUserHasVoted.invalidate();
        }}
      >
        <ArrowDownIcon className="h-4 w-4" />
        <p className="text-xs">{votes?.downvotes}</p>
      </div>
    </div>
  );
};

export default Vote;
