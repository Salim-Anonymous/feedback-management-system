import { Airplay, PlaneIcon, PlusCircleIcon, SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";

type CommentsProps = {
    id: string;
}

const CommentsDialog: React.FC<CommentsProps> = ({ id }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex flex-row w-1/2 items-center justify-center gap-2"
                >
                    <MessageCircle
                        className="w-4 h-4"
                    />
                    <p
                        className="text-xs"
                    >
                        1.2k comments
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <ScrollArea className="h-full gap-2">
                    <DialogHeader
                        className="my-2"
                    >Comments</DialogHeader>
                    <Separator orientation="horizontal" />
                    <div className="flex flex-col gap-2 py-4">
                        <div
                            className="flex flex-row items-center justify-between gap-2"
                        >
                            <img src="https://www.redditstatic.com/avatars/avatar_default_02_0079D3.png" alt="avatar" className="w-8 h-8 rounded-full" />
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <p className="text-sm font-semibold">Surya Narendran</p>
                                    <p className="text-xs text-gray-400">2 hours ago</p>
                                </div>
                                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <div
                        className="flex w-full items-start justify-start gap-2"
                    >
                        <Textarea
                            className="w-2/3 h-12"
                            placeholder="Add a comment"
                        />
                        <Button
                            className="flex flex-row items-center justify-center gap-2"
                        >
                            <SendIcon
                                className="w-4 h-4"
                            />
                            <p
                                className="text-xs"
                            >
                                comment
                            </p>
                        </Button>
                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}

export default CommentsDialog;