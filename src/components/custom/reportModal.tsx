import {
    EyeIcon,
    FlagIcon,
    FormInputIcon,
    SendIcon,
    VenetianMaskIcon,
  } from "lucide-react";
  import { Button } from "../ui/button";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
  } from "../ui/dialog";
  import {
    Form,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/react-hook-form/form";
  import { Separator } from "../ui/separator";
  import { api } from "@/utils/api";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Input } from "@/components/ui/input";
  import { useSession } from "next-auth/react";
  
  type ReportsProps = {
    id: string;
    authorId?: string | null;
  };
  
  const ReportSchema = z.object({
    message: z.string(),
    anonymous: z.boolean(),
    userId: z.string().optional(),
  });
  
  const ReportsModal: React.FC<ReportsProps> = ({ id }) => {
    const { data: reports } = api.report.getFeedbackReportCount.useQuery({
      feedbackId: id,
    });
    const {data:flagged} = api.report.checkIfUserHasReportedFeedback.useQuery({feedbackId: id, userId: useSession().data?.user?.id});
  
    const form = useForm<z.infer<typeof ReportSchema>>({
      resolver: zodResolver(ReportSchema),
      defaultValues: {
        message: "",
        anonymous: false,
        userId: useSession().data?.user?.id,
      },
    });
    const ctx = api.useContext();
    const makeReport = api.report.createReport.useMutation({
        onSuccess: () => {
            form.reset();
            void ctx.report.getFeedbackReportCount.invalidate();
            void ctx.report.checkIfUserHasReportedFeedback.invalidate();
        }
    });
    
  
    function onSubmit(data: z.infer<typeof ReportSchema>) {
      if (data.message.length === 0) return;
        makeReport.mutate({
            feedbackId: id,
            message: data.message,
            anonymous: data.anonymous,
            userId: data.userId,
        });
    }
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-1/2 flex-row items-center justify-center gap-2"
            disabled={flagged?.hasReported}
          >
            <FlagIcon className="h-4 w-4" />
            <p className="text-xs">
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                reports?.count ?? 0
              }{" "}
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="my-2">Report</DialogHeader>
          <Separator />
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
                        <Input
                          className=" w-full resize-none"
                          placeholder="Report"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <Button
                      type="submit"
                      className="flex flex-row items-center justify-center gap-2"
                    >
                      <SendIcon className="h-4 w-4" />
                      <p className="text-xs">Flag</p>
                    </Button>
                  </div>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
    );
  };
export default ReportsModal;