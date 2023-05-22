import Sidebar from "./sidebar"
import Header from "./header"
import React, { useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"

const AppShell = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })

    useEffect(() => {
        if (isDesktop) {
            setSidebarOpen(true)
        } else {
            setSidebarOpen(false)
        }
    }, [isDesktop])


    return <div
        className="w-full min-h-screen"
    >
        {/** content */}
        <main
            className="flex min-h-screen w-full flex-col lg:pl-72 items-center justify-center pt-20"
        >
            <ScrollArea
                className="w-full h-full px-2 lg:pl-4"
            >
                <div
                    className="flex flex-col items-center justify-center"
                >
                    {children}
                </div>

            </ScrollArea>
        </main>
        {/** sidebar */}
        <Sidebar
            open={sidebarOpen}
            setOpen={setSidebarOpen}
        />
        {/** header */}
        <Header
            open={sidebarOpen}
            setOpen={setSidebarOpen}
        />
    </div>
}

export default AppShell