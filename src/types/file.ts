import { z } from "zod";

const FileType = z.object({
    url: z.string(),
    id: z.string(),
});

export type FileType = z.infer<typeof FileType>;
const ArrayFileType = z.array(FileType);
export type ArrayFileType = z.infer<typeof ArrayFileType>;
