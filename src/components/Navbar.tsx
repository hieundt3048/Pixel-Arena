import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center h-16 px-6 border-b">
      <h1 className="text-lg font-mono font-medium">Pixel Battle</h1>

      <div className="flex gap-3">
        <User />
        <h1>Username</h1>
        <p>status</p>
      </div>
    </div>
  );
};

export default Navbar;
