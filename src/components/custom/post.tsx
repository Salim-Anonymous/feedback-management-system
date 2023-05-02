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

const Post = ({ post }: {
    post: {
        title: string,
        body: string
    }
}) => {
    return (
        <div
            className="flex flex-col w-full items-start justify-start bg-white/10 text-white rounded-xl px-4 py-4"
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
            <div
                className="flex flex-row w-full items-center justify-start gap-2 my-4"
            >
                {/**random image from images.unsplash.it */}
                <Image
                    src="https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
                    alt="random"
                    width={1080}
                    height={720}
                    className="rounded-xl"
                />
            </div>
            <Separator
                className="w-full my-4"
            />
            <div
                className="flex flex-row w-full items-center justify-start gap-2 my-4"
            >
                <div
                    className="flex flex-row w-full items-center justify-start gap-2"
                >
                    <ArrowUpIcon
                        className="w-4 h-4"
                    />
                    <p
                        className="text-sm"
                    >
                        1.2k
                    </p>
                </div>
                <div
                    className="flex flex-row w-full items-center justify-start gap-2"
                >
                    <ArrowDownIcon
                        className="w-4 h-4"
                    />
                    <p
                        className="text-sm"
                    >
                        1.2k
                    </p>
                </div>
                <div
                    className="flex flex-row w-full items-center justify-start gap-2"
                >
                    <FlagIcon
                        className="w-4 h-4"
                    />
                    <p
                        className="text-sm"
                    >
                        5
                    </p>
                </div>
                <div
                    className="flex flex-row w-full items-center justify-start gap-2"
                >
                    <HeartIcon
                        className="w-4 h-4"
                    />
                    <p
                        className="text-sm"
                    >
                        1.2k
                    </p>
                </div>
                <div
                    className="flex flex-row w-full items-center justify-start gap-2"
                >
                    <MessageCircle
                        className="w-4 h-4"
                    />
                    <p

                        className="text-sm"
                    >
                        1.2k
                    </p>
                </div>
            </div>


        </div>
    )
}

export default Post