import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AppShell from "@/components/custom/appshell";
import Post from "@/components/custom/post";
import InitialPageLoading from "@/components/custom/inital-page-loading";
import {api} from "@/utils/api";

const Hot: NextPage = (_props) => {
    const {data:feedbacks} = api.feedback.getHotFeedbacks.useQuery();
    const { status,data:session} = useSession();
    if (status == "loading") return <InitialPageLoading />;
    if (status === "unauthenticated") location.href = "/";

    return (
        <>
            <Head>
                <title>Hot</title>
                <meta name="description" content="Getting stated" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <AppShell>
            <div className="flex w-full flex-col items-start justify-center px-4 md:items-center">
                {
                    feedbacks?.map((feedback) => {
                        return <Post
                            key={feedback.id}
                            time={feedback.createdAt}
                            subject={feedback.subject}
                            description={feedback.description}
                            number={feedback.number}
                            status={feedback.status}
                            id={feedback.id}
                            authorId={feedback.authorId}
                            uuid={session?.user?.id}
                        />
                    })
                }
                </div>
            </AppShell>
        </>
    );
};

export default Hot;