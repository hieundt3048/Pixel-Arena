import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import type React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="min-h-svh w-full flex flex-col">
      <Navbar />

      <div className="flex-1 flex p-3 gap-3">
        <main className="w-full p-3 border rounded flex items-center justify-center">
          {children}
        </main>

        <Sidebar />
      </div>
    </div>
  );
};

export default RootLayout;
