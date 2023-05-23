import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircleIcon } from "lucide-react"
import { Textarea } from "../ui/textarea"
import {  useState } from "react"
import FileUpload from "./file-upload"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useMediaQuery } from "react-responsive"
import {api} from "@/utils/api";

export default function SubmitFeedback() {
    const [fileList, setFileList] = useState<FileList | null>(null);
    const createFeedback = api.feedback.create.useMutation({
        onSuccess: () => {
            console.log("success")
        }
    })

    // 👇 files is not an array, but it's iterable, spread to get an array of files
    const files = fileList ? [...fileList] : [];
    const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

    return (
        <></>
    )
}
