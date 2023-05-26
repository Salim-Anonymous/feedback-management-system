import { useMediaQuery } from "react-responsive";
import React from "react";
import ThemeToggle from "./themeToggle";
import UserDropDown from "./user-menu";
import SidebarButton from "./sidebarButton";
import { BellRingIcon, MessageCircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Notifications } from "./notification";
import { Input } from "../ui/input";

const Header = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <header className="fixed left-0 top-0 flex h-16 w-full items-center justify-between bg-white px-3 shadow-md duration-300 ease-in-out dark:bg-[#393646]">
      <div className="flex w-1/3 justify-start items-center gap-2">
        <MessageCircleIcon size={32} />
        <span className="font-bold text-xl inline">feedback</span>
      </div>
      {!isMobile && (
        <div className="flex w-1/3 items-center justify-center gap-2">
          <Input
            placeholder="👁‍🗨 Search"
            className="w-full"
            />
        </div>)
      }
      <div className="flex w-1/3 items-center justify-center gap-2 md:justify-end">
        {
          !isMobile &&(
            <DropdownMenu>
          <DropdownMenuTrigger>
            <BellRingIcon size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full dark:bg-[#393646] dark:text-white">
            <Notifications />
          </DropdownMenuContent>
        </DropdownMenu>
          )
        }
        <UserDropDown />
        <ThemeToggle />
        <SidebarButton open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
