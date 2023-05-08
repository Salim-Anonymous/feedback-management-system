import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircleIcon } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { type ChangeEvent, useState } from "react"
import { Separator } from "@radix-ui/react-separator"

export default function SubmitFeedback() {
    const [fileList, setFileList] = useState<FileList | null>(null);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(fileList)
        setFileList(e.target.files);
    };

    const handleUploadClick = () => {
        if (!fileList) {
            return;
        }

        // 👇 Create new FormData object and append files
        const data = new FormData();
        files.forEach((file, i) => {
            data.append(`file-${i}`, file, file.name);
        });

        // 👇 Uploading the files using the fetch API to the server
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: data,
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    // 👇 files is not an array, but it's iterable, spread to get an array of files
    const files = fileList ? [...fileList] : [];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusCircleIcon className="mr-2" /> Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Feedback</DialogTitle>
                    <DialogDescription>
                        Make sure to keep the post friendly and respectful.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Title">Subject</Label>
                        <Input type="text" id="title" placeholder="Title" />
                    </div>
                </div>
                <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="desc">Description</Label>
                        <Textarea placeholder="Describe your feedback here." />
                    </div>
                </div>
                <div>
                    <input type="file" onChange={handleFileChange} multiple />

                    <ul>
                        {files.map((file, i) => (
                            <li key={i}>
                                {file.name} - {file.type}
                            </li>
                        ))}
                    </ul>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
