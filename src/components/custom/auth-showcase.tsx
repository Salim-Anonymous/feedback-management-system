import { LogIn } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <button
      className="flex h-full w-full gap-2 rounded-md px-4 py-1.5 no-underline outline-none hover:outline-none"
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      <LogIn className="h-5 w-5" />
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};

export default AuthShowcase;
