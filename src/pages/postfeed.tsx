import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/react-hook-form/form"
import {type NextPage} from "next";
import {toast} from "@/components/ui/use-toast";
import AppShell from "@/components/custom/appshell";
import {api} from "@/utils/api";
import {Input} from "@/components/ui/input";

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters long." }),
})

const PostFeedback:NextPage = () => {
    const {data:categories, error} = api.category.getAll.useQuery({text: ""});

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            subject: "",
            items: [],
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        alert(JSON.stringify(data))

    }

    return (
        <AppShell>
            <div className="flex flex-col w-11/12 lg:w-3/4 shadow-md px-3 py-2 rounded-sm">
                <h1 className="text-2xl font-bold mb-6">Post Feedback</h1>
                <Form {...form}>
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* subject form field , description form field */}
                        <FormField
                            name={"subject"}
                            control={form.control}
                            render={
                                ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject</FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="Subject"
                                            className="w-full"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />
                        <FormField
                            control={form.control}
                            name="items"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Category</FormLabel>
                                    </div>
                                    {categories?.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="items"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.name}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </AppShell>
    )
}

export default PostFeedback