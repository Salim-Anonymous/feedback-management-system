import {
  EyeIcon,
  FormInputIcon,
  SendIcon,
  VenetianMaskIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form";
import { MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { api } from "@/utils/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { Input } from "@/components/ui/input";
import Comment from "@/components/custom/comment";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";

type CommentsProps = {
  id: string;
  authorId?: string | null;
};

const CommentSchema = z.object({
  message: z.string(),
  anonymous: z.boolean(),
  userId: z.string().optional(),
});

const CommentsModal: React.FC<CommentsProps> = ({ id }) => {
  const { data: comments } = api.comment.getAllComments.useQuery({
    feedbackId: id,
  });

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      message: "",
      anonymous: false,
      userId: useSession().data?.user?.id,
    },
  });
  const makeComment = api.comment.createComment.useMutation({
    onSuccess: () => {
      void ctx.comment.getAllComments.refetch();
    },
  });
  const ctx = api.useContext();

  function onSubmit(data: z.infer<typeof CommentSchema>) {
    if (data.message.length === 0) return;
    if (data.anonymous) {
      makeComment.mutate({
        message: data.message,
        feedbackId: id,
      });
    } else {
      makeComment.mutate({
        message: data.message,
        feedbackId: id,
        userId: data.userId,
      });
    }
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-1/2 flex-row items-center justify-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          <p className="text-xs">
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              comments?.length ?? 0
            }{" "}
            comments
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="my-2">Comments</DialogHeader>
        <Separator orientation="horizontal" />
        <div className="flex max-h-64 flex-col gap-2 overflow-y-auto py-4">
          {comments?.length === 0 && (
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="text-sm text-gray-400">No comments yet!</p>
              <SendIcon className="h-4 w-4" />
            </div>
          )}
          {comments?.map((comment) => (
            <div
              key={comment.id + "comment"}
              className="flex flex-row items-center justify-between gap-2"
            >
              <Comment
                time={comment.createdAt}
                message={comment.message}
                authorId={comment.authorId}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-2"
            >
              <div className="flex w-full gap-2">
                <FormField
                  name={"message"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormInputIcon>
                        {form.watch("anonymous") ? (
                          <VenetianMaskIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </FormInputIcon>
                      <Input
                        className=" w-full resize-none"
                        placeholder="Leave a comment"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col items-start justify-start gap-2">
                  <FormField
                    render={({ field }) => (
                      <FormItem>
                        <FormDescription>
                          {field.value ? "Anonymous" : "Visible"}
                        </FormDescription>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormItem>
                    )}
                    name={"anonymous"}
                    control={form.control}
                  />
                  <Button
                    type="submit"
                    className="flex flex-row items-center justify-center gap-2"
                  >
                    <SendIcon className="h-4 w-4" />
                    <p className="text-xs">Comment</p>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;
