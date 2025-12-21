import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import UserDialog from "@/components/UserDialog";
import AppProvider from "@/providers/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
      <AppProvider>
        <Toaster />
        <UserDialog />
        <App />
      </AppProvider>
    </StrictMode>
  </>
);
