import { LogIn } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();

    return (
        <button
            className="flex gap-2 w-full h-full px-4 py-1.5 outline-none hover:outline-none rounded-md no-underline"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
            <LogIn
                className="w-5 h-5"
            />
            {sessionData ? "Sign out" : "Sign in"}
        </button>
    );
};

export default AuthShowcase;