import type { ColorPalette, PixelCoord, User } from "@/lib/types";
import { createContext } from "react";

interface PaintToolContextProps {
  currentColor: ColorPalette;
  currentMode: "NONE" | "PESSIMISTIC" | "OPTIMISTIC";
  changeColor: (color: ColorPalette) => void;
  changeMode: (value: string) => void;
  handlePaint: (currentPin: PixelCoord, user: User) => void;
}

export const PaintToolContext = createContext<PaintToolContextProps | null>(
  null
);
