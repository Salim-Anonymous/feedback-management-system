import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AppShell from "@/components/custom/appshell";
import Post from "@/components/custom/post";
import InitialPageLoading from "@/components/custom/inital-page-loading";
import {api} from "@/utils/api";

const Feeds: NextPage = (_props) => {
    const {data:feedbacks} = api.feedback.getAll.useQuery({text:""});
    const { status} = useSession();
    if (status == "loading") return <InitialPageLoading />;
    if (status === "unauthenticated") location.href = "/";

    return (
        <>
            <Head>
                <title>Newsfeeds</title>
                <meta name="description" content="Getting stated" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <AppShell>
                {
                    feedbacks?.map((feedback) => {
                        console.log(feedback)
                        return <Post
                            key={feedback.id}
                            time={feedback.createdAt}
                            subject={feedback.subject}
                            description={feedback.description}
                            number={feedback.number}
                            status={feedback.status}
                            id={feedback.id}
                        />
                    })
                }
            </AppShell>
        </>
    );
};

export default Feeds;