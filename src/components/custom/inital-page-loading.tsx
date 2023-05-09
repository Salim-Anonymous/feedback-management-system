import { MessageCircle } from "lucide-react";

const InitialPageLoading: React.FC = () => {
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

export default InitialPageLoading;