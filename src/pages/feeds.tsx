import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AppShell from "@/components/custom/appshell";
import Post from "@/components/custom/post";
import InitialPageLoading from "@/components/custom/inital-page-loading";
import React from "react";

const Feeds: NextPage = (_props) => {

    const { status } = useSession();
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

                <Post
                    post={
                        {
                            title: "Hello World",
                            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                        }
                    }
                />
                <Post
                    post={
                        {
                            title: "Hello World",
                            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                        }
                    }
                />
                <Post
                    post={
                        {
                            title: "Hello World",
                            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                        }
                    }
                />
                <Post
                    post={
                        {
                            title: "Hello World",
                            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                        }
                    }
                />

            </AppShell>
        </>
    );
};

export default Feeds;