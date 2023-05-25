type Feedback = {
    avatar?: string | undefined | null;
    name?: string | null;
    time: Date;
    subject: string;
    description?: string | null;
    number: bigint;
    image?: string[] | null;
    status: string;
    id: string;
    authorId: string | null;
    uuid: string;
};

export default Feedback;