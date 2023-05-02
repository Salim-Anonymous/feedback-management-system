import Sidebar from "./sidebar"
import Header from "./header"
import React, { useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { ScrollArea } from "../ui/scroll-area"

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
            className="flex min-h-screen w-full flex-col lg:pl-72 items-center justify-start pt-20 bg-gradient-to-b from-[#2e026d] to-[#15162c]"
        >
            <ScrollArea
                className="w-full h-full px-2 lg:pl-4"
            >
                {children}
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