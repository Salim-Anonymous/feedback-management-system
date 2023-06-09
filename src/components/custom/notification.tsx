import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { ScrollArea } from "../ui/scroll-area"

const notifications = [
  {
    title: "Sonam commented on your post!",
    description: "1 hour ago",
  },
  {
    title: "Anonymous commented on your post",
    description: "1 hour ago",
  },
  {
    title: "Your post is on the hot news!",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function Notifications({ className, ...props }: CardProps) {

    const [notifOn, setNotifOn] = useState(false);
  return (
    <Card className={cn("w-full dark:bg-slate-900 dark:text-white border-none shadow-none", className)} {...props}>
      <CardHeader>
        <CardTitle
            className={cn("text-sm")}
        >Notifications</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch 
            onCheckedChange={()=>setNotifOn(!notifOn)}
            checked={notifOn}
          />
        </div>
        <ScrollArea>
        <div
            className={cn("h-32")}
        >
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}
