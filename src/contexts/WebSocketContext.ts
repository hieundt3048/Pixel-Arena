import type { PixelUpdateMessage } from "@/lib/types";
import { createContext } from "react";

interface WebSocketContextProps {
  updatedPoint: PixelUpdateMessage | null;
}

export const WebSocketContext = createContext<WebSocketContextProps | null>(
  null
);
