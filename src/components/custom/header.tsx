import { SidebarOpen, SidebarClose, Settings2Icon } from "lucide-react"
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

const Header = ({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" })

    return <header
        className="fixed top-0 left-0 w-full h-16 px-3 flex items-center justify-between bg-white/20 backdrop-filter backdrop-blur-lg ease-in-out duration-300"
    >
        <Image
            src="/whitelogo.svg"
            width={100}
            height={40} alt={"logo"} />
        <div
            className="flex items-center justify-between w-48"
        >
            <DropdownMenu>
                <DropdownMenuTrigger>
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
                        <span className="ml-2 text-white">Salim</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Settings2Icon size={24} className="text-white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
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