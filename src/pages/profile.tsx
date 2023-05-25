import AppShell from "@/components/custom/appshell";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ProfilePage = () => {
  const {data:session} = useSession();
  return (
    <AppShell>
        <div className="flex flex-col items-start justify-start w-full">
            <div className="flex flex-col items-center justify-center w-full mb-20">
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                {/* @ts-ignore */}
                <Image src={session?.user?.image}
                  alt="profile"
                  className="rounded-full border-4 p-4 border-gray-500"
                  width={200}
                  height={200}
                  />
            </div>
            <div className="flex flex-col items-center justify-center w-full mb-32">
                <Card className={cn("w-full md:w-1/2 dark:bg-slate-800 dark:text-white dark:border-gray-200")}>
                    <CardHeader>
                        <CardTitle>user details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className=" flex items-center space-x-4 rounded-md border p-4 dark:border-gray-200">
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Name
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {session?.user?.name}
                                </p>
                            </div>
                        </div>
                        <div className=" flex items-center space-x-4 rounded-md border p-4 dark:border-gray-200">
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Email
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {session?.user?.email}
                                </p>
                            </div>
                          </div>
                        <div className=" flex items-center space-x-4 rounded-md border p-4">
                          </div>
                    </CardContent>
                </Card>
        </div>
        </div>
    </AppShell>
  );
};

export default ProfilePage;