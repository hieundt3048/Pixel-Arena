import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { UsernameProvider } from "@/contexts/UsernameContext";
import UsernameDialog from "@/components/UsernameDialog";

createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
      <UsernameProvider>
        <Toaster />
        <UsernameDialog />
        <App />
      </UsernameProvider>
    </StrictMode>
  </>
);
