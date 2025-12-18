import type React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

// ============================================================================
// Types
// ============================================================================

interface RootLayoutProps {
  children: React.ReactNode;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Root layout component that provides the main application structure
 * with navbar, main content area, and sidebar
 */
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="h-svh w-full flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 flex p-3 gap-3 overflow-hidden min-h-0">
        <main className="w-full border rounded flex items-center justify-center overflow-hidden min-h-0">
          {children}
        </main>

        <Sidebar />
      </div>
    </div>
  );
};

export default RootLayout;
