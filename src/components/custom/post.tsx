import {
    ArrowUpIcon,
    ArrowDownIcon,
    FlagIcon,
    HeartIcon,
    MessageCircle
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

const Post = ({ post }: {
    post: {
        title: string,
        body: string
    }
}) => {
    return (
        <div
            className="flex flex-col my-4 w-full md:w-2/3 items-start justify-start bg-black/50 text-white rounded-xl px-4 py-4"
        >
            <div
                className="flex flex-row w-full items-center justify-start gap-4"
            >
                <Avatar
                    className="w-12 h-12"
                >
                    <AvatarImage
                        className="w-12 h-12"
                        src="https://avatars.githubusercontent.com/u/25105806?v=4"
                        alt="avatar"
                    />
                    <AvatarFallback
                        className="w-12 h-12"
                    >
                        SN
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
                            Surya Narendran
                        </p>
                        <p
                            className="text-xs text-gray-400"
                        >
                            2 hours ago
                        </p>
                    </div>
                    <p
                        className="text-sm"
                    >
                        #000002
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
                    {post.title}
                </p>
                <p
                    className="text-sm"
                >
                    {post.body}
                </p>
            </div>
            {/** Images display */}
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
            <Separator
                className="w-full my-1"
            />
            <div
                className="flex flex-row w-full items-center justify-evenly gap-4 my-1"
            >
                <Toggle
                    className="flex flex-row w-full items-center justify-center gap-2"
                >
                    <ArrowUpIcon
                        className="w-4 h-4"
                    />
                    <p
                        className="text-xs"
                    >
                        1.2k
                    </p>
                </Toggle>
                <Toggle
                    className="flex flex-row w-full items-center justify-center gap-2"
                >
                    <ArrowDownIcon
                        className="w-4 h-4"
                    />
                    <p
                        className="text-xs"
                    >
                        1.2k
                    </p>
                </Toggle>
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