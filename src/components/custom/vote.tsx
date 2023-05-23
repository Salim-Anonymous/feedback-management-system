// noinspection TypeScriptValidateTypes

import {ArrowDownIcon, ArrowUpIcon} from "lucide-react"
import {api} from "@/utils/api";

type Props = {
    id: string,
    uuid: string | undefined | null
}
const Vote = ({ id, uuid }: Props) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {data: voted} = api.vote.checkIfUserHasVoted.useQuery({feedbackId: id, userId: uuid});
    const {data: votes} = api.vote.getVoteCountForFeedback.useQuery({feedbackId: id});
    const upvote = api.vote.upvote.useMutation();
    const downvote = api.vote.downvote.useMutation();

    return (
        <div
            className="flex flex-row w-full items-center justify-evenly gap-4 my-1" >
            <div
                className={`flex flex-row w-1/2 rounded-md items-center justify-center px-2 py-1 gap-2 ${voted?.hasVoted && voted?.voteType === "UPVOTE" ? "text-green-500 bg-accent" : ""}`}
                onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    upvote.mutate({feedbackId: id, userId: uuid});
                }}
            >
                <ArrowUpIcon
                    className="w-4 h-4"
                />
                <p
                    className={`text-xs `}
                >
                    {votes?.upvotes}
                </p>
            </div>
            <div
                className={`flex flex-row w-1/2 items-center justify-center px-2 py-1 gap-2 ${voted?.hasVoted && voted?.voteType === "DOWNVOTE" ? "text-red-500 bg-accent" : ""}`}
                onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    downvote.mutate({feedbackId: id, userId: uuid});
                }}
            >
                <ArrowDownIcon
                    className="w-4 h-4"
                />
                <p
                    className="text-xs"
                >
                    {votes?.downvotes}
                </p>
            </div>
        </div>
    )
}

export default Vote;