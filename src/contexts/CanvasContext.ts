import type { CanvasFuncProps, PixelCoord } from "@/lib/types";
import { createContext, type RefObject } from "react";

interface CanvasContextProps {
  currentPos: PixelCoord | null;
  currentPin: PixelCoord | null;
  onMouseMove: (props: CanvasFuncProps) => void;
  onMouseLeave: () => void;
  onMouseClick: (props: CanvasFuncProps) => void;
  drawHoverPoint: (ctx: CanvasRenderingContext2D, pos: PixelCoord) => void;
  drawBase: (ref: RefObject<HTMLCanvasElement | null>) => void;
  drawPin: (
    ref: RefObject<HTMLCanvasElement | null>,
    currentPin: PixelCoord | null
  ) => void;
}

export const CanvasContext = createContext<CanvasContextProps | null>(null);
