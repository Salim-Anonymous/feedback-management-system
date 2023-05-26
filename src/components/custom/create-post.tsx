import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {z} from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type NextPage } from "next";
import { api } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/server/uploadthing";
import { type FileType } from "@/types/file";
import Image from "next/image";
import { CrossIcon, MessageSquarePlusIcon, PlusIcon } from "lucide-react";
import { X } from "lucide-react";

const FormSchema = z.object({
  selectedCategories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters long." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .optional(),
  visibility: z.enum(["PUBLIC", "ANONYMOUS"]),
});

const PostFeedback: NextPage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ctx = api.useContext();
  const { data: categories, isLoading } = api.category.getAll.useQuery();
  const [files, setFiles] = useState<FileType[]>([]);

  const createFeedback = api.feedback.create.useMutation({
    onSuccess: () => {
      form.reset();
      files.length = 0;
      setFiles(files);
      void ctx.feedback.getAll.invalidate();
      setOpen(false);
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject: "",
      selectedCategories: [],
      description: "",
      visibility: "ANONYMOUS",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, files);
    createFeedback.mutate({
      subject: data.subject,
      description: data.description,
      visibility: data.visibility,
      categoryIds: data.selectedCategories,
      userId: session?.user.id,
      files: files,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="w-full my-4 "
      >
        <Button
          className="w-full dark:border-[#6D5D6E] dark:hover:bg-[#6D5D6E] dark:text-white dark:hover:text-white dark:hover:border-[#6D5D6E]"
          variant={"outline"}
        >
          <MessageSquarePlusIcon size={24} />
          <span className="ml-2">Post Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen w-[600px] mx-2 max-w-full">
        <Form {...form}>
          <DialogHeader className="h-1/5">
            <DialogTitle>Create Feedback</DialogTitle>
          </DialogHeader>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="h-[68%] lg:h-[80%] px-6">
              <FormField
                name={"subject"}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      {...field}
                      placeholder="Subject"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Description"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select visibility"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PUBLIC">Public</SelectItem>
                        <SelectItem value="ANONYMOUS">Anonymous</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
                name="visibility"
                control={form.control}
              />
              <FormField
                control={form.control}
                name="selectedCategories"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Category</FormLabel>
                    </div>
                    {isLoading && (
                      <div className="flex items-center justify-center">
                        <span className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></span>
                      </div>
                    )}
                    {categories?.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="selectedCategories"
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-gray-400 rounded-md p-2 m-3 border-dotted border-2">
              <UploadButton<OurFileRouter>
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log(res);
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setFiles((prev) => [...prev,{id: res[0].fileKey,url: res[0].fileUrl,},
                  ]);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <div className="grid grid-cols-3 gap-4 w-full min-h-[100px] mb-4">
                  {files.map((file) => (
                    <div
                    key={file.id}
                    className="rounded-sm flex flex-col items-center justify-center"
                    >
                      <Image
                        src={file.url}
                        height={100}
                        width={100} alt={""}
                        />
                        <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          setFiles((prev) => prev.filter((item) => item.id !== file.id));
                        }}
                        >
                          Delete
                        </Button>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Create
              </Button>
              <Button
                type="reset"
                variant="secondary"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostFeedback;
