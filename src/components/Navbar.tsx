import { Swords } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth, useWebSocket } from "@/hooks";

const Navbar = () => {
  const { currentUsername } = useAuth();
  const { connected } = useWebSocket();

  const username = currentUsername || "Guest";

  return (
    <nav className="h-16 bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-between px-6 shadow-lg">
      <section className="flex items-center gap-2 text-white">
        <Swords />
        <h1 className="text-xl font-semibold font-mono">Pixel Arena</h1>
      </section>

      <section className="flex items-center gap-2 font-mono bg-white/20 backdrop-blur-sm px-2 py-1.5 pr-3.5 rounded-full">
        <Avatar className="outline outline-white/50">
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-xs text-white">
          <h1 className="font-semibold truncate max-w-20">{username}</h1>
          <p className="text-white/80">
            {connected ? "Connected" : "Disconnected"}
          </p>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
