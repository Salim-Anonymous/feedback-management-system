import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from "react";
import * as z from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { api } from "@/utils/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";

const CategoryFormSchema = z.object({
  category: z.string({
    required_error: "Please enter a category name.",
  }),
  moderatorId: z.string({
    required_error: "Please select a moderator.",
  }),
  description: z.string({
    required_error: "Please enter a description.",
  }),
  moderator: z.string({
    required_error: "Please select a moderator.",
  }),
});

export default function ModeratorEdit({ categoryId }: { categoryId: string }) {
  const ctx = api.useContext();
  const updatecategory = api.category.updateCategory.useMutation({
    onSuccess: () => {
      void ctx.category.getAll.invalidate();
    },
  });
  const { data: users } = api.user.getAll.useQuery({ text: "" });
  const { data: categoryDetails } = api.category.getCategoryById.useQuery({
    categoryId: categoryId,
  });
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
        category: categoryDetails?.name,
        moderatorId: categoryDetails?.moderatorId,
        description: categoryDetails?.description,
        moderator: users?.filter((user) => user.id === categoryDetails?.moderatorId)[0]?.name,
    },
  });
  function onSubmit(data: z.infer<typeof CategoryFormSchema>) {
    console.log(data);
    updatecategory.mutate({
      categoryId: categoryId,
      name: data.category,
      moderatorId: data.moderatorId,
      description: data.description,
    });
    // clean
    form.reset();
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Moderator</DialogTitle>
        </DialogHeader>
        <Form {...form}>
           {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            {...field}
                            className="w-full"
                        />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="moderatorId"
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
                            ? users?.find((user) => user.id === field.value)
                                ?.name
                            : "Select Moderator"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search moderator..." />
                        <CommandGroup>
                          {users?.map((user) => (
                            <CommandItem
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              value={user.id}
                              key={user.id}
                              onSelect={(value) => {
                                form.setValue("moderatorId", user.id);
                                form.setValue("moderator", value);
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
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
