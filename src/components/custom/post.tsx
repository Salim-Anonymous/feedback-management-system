import { FlagIcon, HeartIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Image from "next/image";
import CommentsModal from "./commentsModal";
import { api } from "@/utils/api";
import Vote from "@/components/custom/vote";
import moment from "moment";
import { Skeleton } from "../ui/skeleton";
import type Feedback from "@/types/feedback";

const Post = ({
  avatar = "",
  name = "Anonymous",
  time,
  subject,
  description,
  number,
  status,
  id,
  authorId,
  uuid,
}: Feedback) => {
  if (authorId != null) {
    const { data: author } = api.user.getUser.useQuery({ userId: authorId });
    if (author != null) {
      avatar = author.image;
      name = author.name;
    }
  }
  const ctx = api.useContext();
  const { data: files, isLoading: fileLoading } = api.file.getFile.useQuery({id: id});
  const { data: likes } = api.like.getLikeCountForFeedback.useQuery({feedbackId: id});
  const { data: liked } = api.like.checkIfUserHasLiked.useQuery({ feedbackId: id, userId: uuid });
  const { data: flagged } = api.report.checkIfUserHasReportedFeedback.useQuery({ feedbackId: id, userId: uuid });
  const {data:flags} = api.report.getFeedbackReportCount.useQuery({feedbackId: id});
  const like = api.like.likeOrUnlike.useMutation({onSuccess: () => {
      void ctx.like.getLikeCountForFeedback.refetch()
      void ctx.like.checkIfUserHasLiked.refetch()},
  });
  

  return (
    <div className="border-1 my-4 flex w-full flex-col items-start justify-start rounded-xl border border-gray-400 px-4 py-4 shadow-md dark:bg-black/50 dark:text-white md:w-2/3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-2">
            <Avatar className="h-12 w-12">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <AvatarImage className="h-14 w-14" src={avatar} alt="avatar" />
              <AvatarFallback className="h-12 w-12">
                {name != null ? name[0] : "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-sm font-semibold">{name}</p>
              <p className="flex gap-4 text-sm">
                #{number.toString()}
                {status === "OPEN" ? (
                  <span className="text-green-500">Open</span>
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </p>
            </div>
        </div>
        <div>
          <span className="text-xs text-gray-400">
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                Date.now() - time < 86400000
                  ? moment(time).fromNow()
                  : moment(time).format("DD/MM/YYYY")
              }
          </span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex h-auto w-full flex-col items-center justify-center gap-2">
        <p className="w-full break-words text-xl font-semibold">{subject}</p>
        <p className="w-full break-words text-sm">{description}</p>
        <div
          className={`grid gap-x-0 ${
            files?.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */}
          {files?.map((file) => (
            <Image
              key={file?.id}
              src={file?.url}
              alt="random"
              priority
              width={500}
              height={500}
              className="rounded-xl"
            />
          ))}
        </div>
        {fileLoading && <Skeleton className="h-72 w-full rounded-md" />}
      </div>
      <Separator className="my-1 " />
      <div className="my-1 flex w-full flex-row items-center justify-evenly gap-4">
        <Vote id={id} uuid={uuid} />
        <div
          className={`flex w-full flex-row items-center justify-center gap-2
          ${!!liked ? "text-red-500" : "text-gray-400"}`}
          onClick={() => {like.mutate({ feedbackId: id, userId: uuid })}}
        >
          <HeartIcon className="h-4 w-4" />
          <p className="text-sm">
            {likes?.count}
          </p>
        </div>
        <div
          className={`flex w-full flex-row items-center justify-center gap-2
            ${flagged ? "text-blue-500" : "text-gray-400"}`}
          onClick={() => {console.log(flags?.count)}}
        >
          <FlagIcon className="h-4 w-4" />
          <p className="text-sm">
            {
              flags?.count
            }
          </p>
        </div>
      </div>
      <div className="my-4 flex w-full flex-row items-center justify-evenly gap-2">
        <CommentsModal id={id} />
      </div>
    </div>
  );
};

export default Post;
