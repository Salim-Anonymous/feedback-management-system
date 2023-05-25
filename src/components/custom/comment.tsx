import moment from "moment/moment";
import { api } from "@/utils/api";

type CommentProps = {
  avatar?: string;
  name?: string | null;
  time: Date;
  message: string | null;
  authorId?: string | null;
};
const Comment: React.FC<CommentProps> = ({
  avatar = "https://www.redditstatic.com/avatars/avatar_default_02_0079D3.png",
  name = "Anonymous",
  time,
  message,
  authorId,
}) => {
  if (authorId != null) {
    const { data: author } = api.user.getUser.useQuery({ userId: authorId });
    if (author != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      avatar = author.image;
      name = author.name;
    }
  }
  return (
    <>
      <img src={avatar} alt="avatar" className="h-8 w-8 rounded-full" />
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-400">
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              Date.now() - time < 86400000
                ? moment(time).fromNow()
                : moment(time).format("DD/MM/YYYY")
            }
          </p>
        </div>
        <p className="break-words text-sm">
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            message.length <= 100
              ? message
              : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                message.slice(0, 100) + "..."
          }
        </p>
      </div>
    </>
  );
};

export default Comment;
