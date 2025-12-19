import type { CanvasFuncProps, PixelCoord, PixelRecord } from "@/lib/types";
import { createContext, useContext } from "react";

export interface CanvasContextData {
  loading: boolean;
  data: PixelRecord[] | null;
  currentCoord: PixelCoord | null;
  drawHoverPoint: (ctx: CanvasRenderingContext2D, coords: PixelCoord) => void;
  handleHover: (props: CanvasFuncProps) => void;
  handleLeave: () => void;
}

export const CanvasContext = createContext<CanvasContextData | null>(null);

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context)
    throw new Error("useCanvas must be used within a CanvasProvider");

  return context;
};
