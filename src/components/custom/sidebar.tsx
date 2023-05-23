import { TrendingUpIcon, LucideFeather, NewspaperIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Checkbox } from "../ui/checkbox"
import { ScrollArea } from "../ui/scroll-area"
import { SidebarClose } from "lucide-react"
import { useMediaQuery } from "react-responsive"
import Link from "next/link";
import {api} from "@/utils/api";

const Sidebar = ({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" })

    const links = [
        {
            name: "Newsfeed",
            href: "/feeds",
            icon: <NewspaperIcon size={24} className="inline mr-2" />
        },
        {
            name: "Hot",
            href: "/hot",
            icon: <TrendingUpIcon size={24} className="inline mr-2" />
        },
        {
            name: "Featured",
            href: "/featured",
            icon: <LucideFeather size={24} className="inline mr-2" />
        },
    ]

    const {data:categories,isLoading} = api.category.getAll.useQuery({text: ""});

    return <aside
        className={`fixed top-0 left-0 w-72 py-6 lg:pt-20 px-6 h-screen flex flex-col items-start border border-l-black justify-start bg-white dark:text-white dark:bg-black/30 transition-all ease-in-out duration-300 z-50 lg:z-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
        {
            isMobileOrTablet && <Button
                variant={"ghost"}
                className="text-sm font-semibold mb-4 w-full flex justify-start whitespace-nowrap"
                onClick={() => setOpen(false)}
            >
                <SidebarClose size={12} className="inline mr-2" />
                Close
            </Button>
        }
        {links.map((link, index) => <Link href={  link.href } key={index}>
            <Button
                key={index}
                variant={"ghost"}
                className="text-md font-semibold mb-4 w-full flex justify-start whitespace-nowrap"
            >
                {link.icon}
                {link.name}
            </Button>
        </Link>
        )}
        <Separator className="w-full my-4" />
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ScrollArea
            className="h-5/6 p-4"
        >
            {
                isLoading && <div className="w-full flex justify-center items-center">
                    <span className="text-sm font-semibold">Loading...</span>
                </div>
            }
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                !isLoading && categories.length === 0 && <div className="w-full flex justify-center items-center">
                    <span className="text-sm font-semibold">No categories found</span>
                </div>
            }
            {   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                categories?.map((category, index) => <div
                key={index}
                className="w-full flex justify-start items-center mb-4"
            >
                <Checkbox id={`category-${index}`}
                    className="bg-white/20 border-black/20"
                />
                <label htmlFor={`category-${index}`} className="ml-2 text-sm font-semibold flex items-center">
                    {category.name}
                </label>
            </div>)}

        </ScrollArea>
    </aside>
}

export default Sidebar