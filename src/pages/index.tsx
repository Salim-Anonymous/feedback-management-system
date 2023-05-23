import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import Image from "next/image";

const Home: NextPage = (_props) => {
  const { status } = useSession();

  if (status === "authenticated") {
    location.href = "/feeds";
  }

  return (
    <>
      <Head>
        <title>Feedback Management System</title>
        <meta name="description" content="Getting stated" />
        <link rel="icon" href="/fav.png" />
      </Head>
      <main id="bgcst" className="flex min-h-screen px-3 flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container rounded-xl bg-black/30 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Image
            src="/whitelogo.svg"
            alt="logo"
            width={700}
            height={200}
          />
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/50 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
