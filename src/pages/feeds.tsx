import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AppShell from "@/components/custom/appshell";
import Post from "@/components/custom/post";
import { MessageCircle } from "lucide-react";
import React from "react";

const Loading: React.FC = () => {
    return <div
        className=" bg-black/90 w-full h-screen flex flex-col items-center justify-center gap-8"
    >
        <MessageCircle
            className="w-40 h-40 animate-bounce text-white"
        />
        <h1
            className="text-white text-6xl font-semibold animate-pulse"
        >
            Loading...
        </h1>
    </div>;
}

const Feeds: NextPage = (_props) => {

    const { status } = useSession();
    if (status == "loading") return <Loading />;
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