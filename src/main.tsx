import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import CanvasProvider from "@/provider/CanvasProvider";
import UserProvider from "@/provider/UserProvider";
import UserDialog from "@/components/UserDialog";

createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
      <UserProvider>
        <CanvasProvider>
          <Toaster />
          <UserDialog />
          <App />
        </CanvasProvider>
      </UserProvider>
    </StrictMode>
  </>
);
