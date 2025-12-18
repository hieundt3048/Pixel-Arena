import { User } from "lucide-react";
import { useUsername } from "@/contexts/UsernameContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { username, status } = useUsername();

  return (
    <div className="w-full flex justify-between items-center h-16 px-6 border-b">
      <h1 className="text-lg font-mono font-medium">Pixel Battle</h1>

      <div className="flex items-center gap-3">
        <User className="size-5 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <span className="font-medium">{username || "Guest"}</span>
          <Badge
            variant={status === "online" ? "default" : "secondary"}
            className={
              status === "online"
                ? "bg-green-500 hover:bg-green-600 text-white border-transparent"
                : ""
            }
          >
            {status === "online" ? "Online" : "Offline"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
