import { FlameIcon, NewspaperIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarClose } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { api } from "@/utils/api";
import { Skeleton } from "../ui/skeleton";

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });

  const links = [
    {
      name: "Newsfeed",
      href: "/feeds",
      icon: <NewspaperIcon size={24} className="mr-2 inline" />,
    },
    {
      name: "Hot",
      href: "/hot",
      icon: <FlameIcon size={24} className="mr-2 inline" />,
    },
  ];

  const { data: categories, isLoading:categoriesLoading } = api.category.getAll.useQuery();
  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col items-start justify-start border border-l-black bg-white px-6 py-6 transition-all duration-300 ease-in-out dark:bg-black/90 dark:text-white lg:z-0 lg:pt-20 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {isMobileOrTablet && (
        <Button
          variant={"ghost"}
          className="mb-4 flex w-full justify-start whitespace-nowrap text-sm font-semibold"
          onClick={() => setOpen(false)}
        >
          <SidebarClose size={12} className="mr-2 inline" />
          Close
        </Button>
      )}
      {links.map((link, index) => (
        <Link href={link.href} key={index}>
          <Button
            key={index}
            variant={"ghost"}
            className="text-md mb-4 flex w-full justify-start whitespace-nowrap font-semibold"
          >
            {link.icon}
            {link.name}
          </Button>
        </Link>
      ))}
      <Separator className="my-4 w-full" />
      <h2 className="mb-4 text-xl font-bold">Categories</h2>
      <ScrollArea className="h-5/6 p-4">
        {categoriesLoading && (
          <Skeleton className="w-full h-5"/>
        )}
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !categoriesLoading && categories?.length === 0 && (
            <div className="flex w-full items-center justify-center">
              <span className="text-sm font-semibold">No categories found</span>
            </div>
          )
        }
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          categories?.map((cat, index) => (
            <div
              key={`${index}sidebar_category`}
              className="mb-4 flex w-full items-center justify-start"
            >
              <Checkbox
                id={`category-${cat.id}`}
                className="border-black/20 bg-white/20"
              />
              <label
                htmlFor={`category-${cat.id}-label`}
                className="ml-2 flex items-center text-sm font-semibold"
              >
                {cat.name}
              </label>
            </div>
          ))
        }
        {
          
        }
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
