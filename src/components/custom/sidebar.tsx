import { TrendingUpIcon, LucideFeather, NewspaperIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Checkbox } from "../ui/checkbox"
import { ScrollArea } from "../ui/scroll-area"
import { SidebarClose } from "lucide-react"
import { useMediaQuery } from "react-responsive"

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

    const categories = [
        {
            name: "Academics",
            flag: "🎓"
        },
        {
            name: "Teaching Experience",
            flag: "👨‍🏫"
        },
        {
            name: "Course Content",
            flag: "📚"
        },
        {
            name: "Facilities & Services",
            flag: "🏫"
        },
        {
            name: "Safety & Security",
            flag: "🚨"
        },
        {
            name: "Student Support",
            flag: "👨‍👩‍👧‍👦"
        }, {
            name: "Extracurricular Activities",
            flag: "🎨"
        },
        {
            name: "Administration & Policies",
            flag: "📝"
        },
    ]

    return <aside
        className={`fixed top-0 left-0 w-72 py-6 lg:pt-20 px-6 h-screen flex flex-col items-start justify-start text-white bg-black/30 backdrop-filter backdrop-blur-lg transition-all ease-in-out duration-300 z-50 lg:z-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
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
        {links.map((link, index) => <Button
            key={index}
            variant={"ghost"}
            className="text-md font-semibold mb-4 w-full flex justify-start whitespace-nowrap"
            onClick={() => location.href = link.href}
        >
            {link.icon}
            {link.name}
        </Button>
        )}
        <Separator className="w-full my-4" />
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ScrollArea
            className="h-5/6 p-4"
        >
            {categories.map((category, index) => <div
                key={index}
                className="w-full flex justify-start items-center mb-4"
            >
                <Checkbox id={`category-${index}`}
                    className="bg-white/20 border-black/20"
                />
                <label htmlFor={`category-${index}`} className="ml-2 text-sm font-semibold flex items-center">
                    {category.flag}
                    {category.name}
                </label>
            </div>)}

        </ScrollArea>
    </aside>
}

export default Sidebar