import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import React from "react";

import ThemeToggle from "./themeToggle";
import PostFeedback from "@/components/custom/create-post";
import { color } from "./themeToggle";
import UserDropDown from "./user-menu";
import SidebarButton from "./sidebarButton";
import { BellRingIcon, MessageCircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Notifications } from "./notification";

const Header = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const color = document.body.classList.contains("dark") ? "dark" : "light";
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <header className="fixed left-0 top-0 flex h-16 w-full items-center justify-between bg-white px-3 shadow-md duration-300 ease-in-out dark:bg-black">
      <div className="flex justify-center items-center gap-2">
        <MessageCircleIcon size={32} />
        <span className="font-bold text-xl inline">feedback</span>
      </div>
      <div className="flex w-full items-center justify-center gap-2 md:justify-end">
        <PostFeedback />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BellRingIcon size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <Notifications />
          </DropdownMenuContent>
        </DropdownMenu>
        <UserDropDown />
        <SidebarButton open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
