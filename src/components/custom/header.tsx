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
import ThemeToggle from "./themeToggle"
import useLocalStorage from "@/hooks/useLocalStorage"

const Header = ({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" })
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" })
    const [theme, setTheme] = useLocalStorage("", "light")
    const logo = theme === 'light' ? "/whitelogo.svg" : "/blacklogo.svg"

    return <header
        className="fixed top-0 left-0 w-full h-16 px-3 flex items-center justify-between bg-white dark:bg-black shadow-md ease-in-out duration-300"
    >
        {isMobile ? <Image
            className="cursor-pointer mr-1"
            src={logo}
            priority
            width={70}
            height={50} alt={"logo"} /> : <Image
            className="cursor-pointer mr-1"
            src={logo}
            priority
            width={100}
            height={50} alt={"logo"} />}
        <div
            className="w-full flex justify-end items-center gap-3"
        >
            <SubmitFeedback />
            <Popover>
                <PopoverTrigger
                    className="outline-none focus:outline-none rounded-full p-1 cursor-pointer"
                >
                    <BellIcon size={24} />
                </PopoverTrigger>
                <PopoverContent
                    className="relative w-96 h-96 border-none"
                >
                    <div
                        className="w-full flex items-center justify-between px-3 "
                    >
                        <span className="dark:text-white">Notifications</span>
                        <Button
                            className="hover:bg-black/10"
                            variant="ghost"
                        >
                            <Settings2Icon size={24} className="" />
                        </Button>
                    </div>
                    <Separator />
                    <ScrollArea
                        className="mt-4 w-full h-4/5"
                    >
                        <div
                            className="flex flex-col items-center justify-center"
                        >
                            <span className="">No notifications</span>
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
            <ThemeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="outline-none focus:outline-none"
                >
                    <div
                        className="flex items-center justify-between cursor-pointer rounded-full md:rounded-md px-2 py-1 hover:bg-black/10 transition-all ease-in-out duration-300"
                    >
                        <Avatar
                            className="w-8 h-8 mr-2"
                        >
                            <AvatarImage
                                src="https://avatars.githubusercontent.com/u/73750430?v=4"
                            />
                            <AvatarFallback>SP</AvatarFallback>
                        </Avatar>
                        {!isMobileOrTablet && <span>Salim</span>}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="relative px-3 py-2 top-4 border-none"
                >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
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
                className="transition-all ease-in-out duration-1000"
                variant="ghost"
                onClick={() => setOpen(!open)}
            >
                {!open ? <SidebarOpen size={24} /> : <SidebarClose size={24} />}
            </Button>}
        </div>
    </header>
}

export default Header