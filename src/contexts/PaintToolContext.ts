import { createContext } from "react";

interface PaintToolContextProps {
  currentPoint: string;
}

export const PaintToolContext = createContext<PaintToolContextProps | null>(
  null
);
