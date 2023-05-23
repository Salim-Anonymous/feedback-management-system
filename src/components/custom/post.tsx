import {
    FlagIcon,
    HeartIcon,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "../ui/avatar"
import { Separator } from "../ui/separator"
import Image from "next/image"
import { Button } from "../ui/button"
import { Toggle } from "../ui/toggle"
import { AspectRatio } from "../ui/aspect-ratio"
import CommentsDialog from "./comment"
import {api} from "@/utils/api";
import Vote from "@/components/custom/vote";

type Feedback = {
    avatar?: string | undefined | null,
    name?: string | null,
    time: Date,
    subject: string,
    description?: string|null,
    number: bigint,
    image?: string[]|null,
    status: string,
    id: string,
    authorId: string | null,
    uuid: string | undefined | null
}
const Post = ({
    avatar="https://avatars.githubusercontent.com/u/25105806?v=4",
    name="Anonymous",
    time,
    subject,
    description,
    number,
    status,
    id,
    authorId,
    uuid
}: Feedback) => {

    if (authorId != null) {
        const {data:author} = api.user.getUser.useQuery({userId: authorId});
        if (author != null) {
            avatar = author.image;
            name = author.name;
        }
    }
    const {data:images,isLoading:imageLoading} = api.image.getImagesForFeedback.useQuery({feedbackId: id});
    return (
        <div
            className="flex flex-col my-4 w-full md:w-2/3 items-start justify-start shadow-md border border-1 border-gray-400 dark:bg-black/50 dark:text-white rounded-xl px-4 py-4"
        >
            <div
                className="flex flex-row w-full items-center justify-start gap-4"
            >
                <Avatar
                    className="w-12 h-12"
                >
                    <AvatarImage
                        className="w-12 h-12"
                        src={avatar}
                        alt="avatar"
                    />
                    <AvatarFallback
                        className="w-12 h-12"
                    >
                        {name != null ? name[0] : "A"}
                    </AvatarFallback>
                </Avatar>
                <div
                    className="flex flex-col w-full items-start justify-start gap-2"
                >
                    <div
                        className="flex flex-row w-full items-center justify-start gap-2"
                    >
                        <p
                            className="text-sm font-semibold"
                        >
                            {name}
                        </p>
                        <p
                            className="text-xs text-gray-400"
                        >
                            {Date.now() - time.getTime() > 86400000 ? `${Math.floor((Date.now() - time.getTime()) / 86400000)} days ago` : `${Math.floor((Date.now() - time.getTime()) / 3600000)} hours ago`}
                        </p>
                    </div>
                    <p
                        className="text-sm flex gap-4"
                    >
                        #{number.toString()}
                        {status === "OPEN" ? <span className="text-green-500">Open</span> : <span className="text-red-500">Closed</span>}
                    </p>
                </div>
            </div>
            <Separator
                className="w-full my-4"
            />
            <div
                className="flex flex-col w-full items-start justify-start gap-2"
            >
                <p
                    className="text-lg font-semibold"
                >
                    {subject}
                </p>
                <p
                    className="text-sm"
                >
                    {description}
                </p>
            </div>
            {/** Images display */}
            {
                images ? "" :
                    imageLoading ?<p>Loading</p>:(
                    <AspectRatio
                        ratio={16 / 12}
                        className="flex flex-row w-full items-center justify-start gap-2 my-4"
                    >
                        {/**random image from images.unsplash.it */}
                        <Image
                            src="https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
                            alt="random"
                            width={1080}
                            priority
                            height={720}
                            className="rounded-xl"
                        />
                    </AspectRatio>
                )
            }
            <Separator
                className="w-full my-1"
            />
            <div
                className="flex flex-row w-full items-center justify-evenly gap-4 my-1"
            >
                <Vote id={id} uuid={uuid} />
                <Toggle
                    className="flex flex-row w-full items-center justify-center gap-2"
                >
                    <HeartIcon
                        className="w-4 h-4"
                    />
                    <p
                        className="text-xs"
                    >
                        1.2k
                    </p>
                </Toggle>
            </div>
            <div
                className="flex flex-row w-full items-center justify-evenly gap-2 my-4"
            >
                <CommentsDialog id="sadsad" />
                <Button
                    className="flex flex-row w-1/2 bg-red-500 items-center justify-start gap-2"
                >
                    <FlagIcon
                        className="w-4 h-4"
                    />
                    <p
                        className="text-sm"
                    >
                        5 reports
                    </p>
                </Button>
            </div>
        </div>
    )
}

export default Post