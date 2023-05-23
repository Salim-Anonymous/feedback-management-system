import {Button} from "../ui/button";
import {Input} from "../ui/input";
import React from "react";
import * as z from "zod"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {api} from "@/utils/api";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/react-hook-form/form"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
 } from "../ui/popover";

type CommentsProps = {
    id?: string;
}

const CategoryFormSchema = z.object({
    category: z.string({
        required_error: "Please enter a category name.",
    }),
    moderator: z.string({
        required_error: "Please select a moderator.",
    }),
    moderatorId: z.string({
        required_error: "Please select a moderator.",
    })
});

const CategoryDialog: React.FC<CommentsProps> = ({}) => {
    const {data: users} = api.user.getAll.useQuery({text: ""});
    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver: zodResolver(CategoryFormSchema),
    });
    const createcategory = api.category.createCategory.useMutation();

    function onSubmit(data: z.infer<typeof CategoryFormSchema>) {
        createcategory.mutate({
            name: data.category,
            moderatorId: data.moderatorId
        });
        // clean
        form.reset();
        toast(
            <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>Category added successfully</span>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col border my-10 p-6"
        >
            <h1>Add Categories</h1>
            <div className="flex flex-col">
                <Form {...form}>
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="category"
                            render={
                                    ({field}) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Input
                                                {...field}
                                                placeholder="Enter a category name"
                                                defaultValue={""}
                                            />
                                        </FormItem>
                                    )
                                }
                        />
                        <FormField
                            control={form.control}
                            name="moderator"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Moderator</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? users?.find(
                                                            (user) => user.id === field.value
                                                        )?.name
                                                        : "Select Moderator"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search framework..." />
                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                <CommandGroup>
                                                    {users?.map((user) => (
                                                        <CommandItem
                                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                            // @ts-ignore
                                                            value={user.id}
                                                            key={user.id}
                                                            onSelect={(value) => {
                                                                form.setValue("moderatorId", user.id)
                                                                form.setValue("moderator", value)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    user.id === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {user.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            Add
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CategoryDialog;