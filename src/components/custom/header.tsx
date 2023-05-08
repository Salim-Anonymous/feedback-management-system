import { SidebarOpen, SidebarClose, Settings2Icon, BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "react-responsive"
import Image from "next/image"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthShowcase from "./auth-showcase"
import { Separator } from "../ui/separator"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ScrollArea } from "../ui/scroll-area"
import SubmitFeedback from "./submit-feedback"

const Header = ({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" })
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

    return <header
        className="fixed top-0 left-0 w-full h-16 px-3 flex items-center justify-between bg-black/40 backdrop-filter backdrop-blur-lg ease-in-out duration-300"
    >
        {isMobile ? <Image
            className="cursor-pointer mr-1"
            src="/whitelog.png"
            priority
            width={40}
            height={50} alt={"logo"} /> : <Image
            className="cursor-pointer mr-1"
            src="/whitelogo.svg"
            priority
            width={100}
            height={50} alt={"logo"} />}

        <div
            className="w-full text-white flex justify-end items-center gap-8"
        >
            <SubmitFeedback />
            <Popover>
                <PopoverTrigger
                    className="outline-none focus:outline-none hover:bg-white/10 rounded-full p-1 cursor-pointer"
                >
                    <BellIcon size={24} className="text-white" />
                </PopoverTrigger>
                <PopoverContent
                    className="relative w-96 h-96 bg-black/50 backdrop-filter backdrop-blur-lg text-white border-none"
                >
                    <div
                        className="w-full flex items-center justify-between px-3 "
                    >
                        <span className="text-white">Notifications</span>
                        <Button
                            className="hover:bg-black/10"
                            variant="ghost"
                        >
                            <Settings2Icon size={24} className="text-white" />
                        </Button>
                    </div>
                    <Separator />
                    <ScrollArea
                        className="mt-4 w-full h-4/5"
                    >
                        <div
                            className="flex flex-col items-start justify-start"
                        >
                            <span className="text-white">No notifications</span>
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>

            <DropdownMenu>
                <DropdownMenuTrigger
                    className="outline-none focus:outline-none"
                >
                    <div
                        className="flex items-center justify-between cursor-pointer rounded-md px-2 py-1 hover:bg-white/40"
                    >
                        <Avatar
                            className="w-8 h-8"
                        >
                            <AvatarImage
                                src="https://avatars.githubusercontent.com/u/73750430?v=4"
                            />
                            <AvatarFallback>SP</AvatarFallback>
                        </Avatar>
                        {!isMobileOrTablet && <span className="text-white">Salim</span>}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="relative px-3 py-2 top-4 bg-black/50 backdrop-filter backdrop-blur-lg text-white border-none"
                >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <Separator className="w-full my-2" />
                    <DropdownMenuItem
                        className="p-0 m-0 bg-transparent hover:bg-transparent"
                    >
                        <AuthShowcase />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isMobileOrTablet && <Button
                className="text-white transition-all ease-in-out duration-1000"
                variant="ghost"
                onClick={() => setOpen(!open)}
            >
                {!open ? <SidebarOpen size={24} /> : <SidebarClose size={24} />}
            </Button>}
        </div>
    </header>
}

export default Header