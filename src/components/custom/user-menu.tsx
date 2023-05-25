
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import AuthShowcase from "./auth-showcase";
import { Separator } from "@/components/ui/separator";
import { useSession } from 'next-auth/react';
import { useMediaQuery } from 'react-responsive';

export default function UserDropDown() {

    const {data:session} = useSession();
    const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });
    const isAdmin = session?.user?.role === "ADMIN";

  return (
    <DropdownMenu>
          <DropdownMenuTrigger className="outline-none focus:outline-none">
            <div className="flex cursor-pointer items-center justify-between rounded-full px-2 py-1 transition-all duration-300 ease-in-out hover:bg-black/10 md:rounded-md">
              <Avatar className="mr-2 h-8 w-8">
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isMobileOrTablet && <span>{session?.user?.name}</span>}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative top-4 border-none px-3 py-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
              <Link href={`/profile`}>Profile</Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem>
                <Link href={`/admin`}>Admin</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link href={`/settings`}>Settings</Link>
            </DropdownMenuItem>
            <Separator className="my-2 w-full" />
            <DropdownMenuItem className="m-0 bg-transparent p-0 hover:bg-transparent">
              <AuthShowcase />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}
