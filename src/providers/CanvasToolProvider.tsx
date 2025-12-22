import { CanvasToolContext, useAuth } from "@/hooks";
import { COLORS_PALETTE } from "@/lib/constants";
import { http } from "@/lib/http";
import type {
  AppError,
  ColorPalette,
  ConcurrencyMode,
  PixelCoord,
  PixelRequest,
  PixelUpdateMessage,
} from "@/lib/types";
import { useState } from "react";

const CanvasToolProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUsername } = useAuth();
  const [currentColor, setCurrentColor] = useState<ColorPalette>(
    COLORS_PALETTE[0]
  );
  const [currentMode, setCurrentMode] =
    useState<ConcurrencyMode["value"]>("NONE");

  const changeColor = (color: ColorPalette) => setCurrentColor(color);
  const changeMode = (value: string) =>
    setCurrentMode(value as ConcurrencyMode["value"]);

  const handlePaint = async (currentPin: PixelCoord) => {
    try {
      if (!currentUsername) throw new Error("failed while processing data");

      const data: PixelRequest = {
        ...currentPin,
        updatedBy: currentUsername,
        color: currentColor.value,
        mode: currentMode,
      };

      const res = await http.post<PixelUpdateMessage>("/pixels/paint", data);

      if (res.status !== 200) throw new Error("failed while processing data");

      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return e?.response?.data as AppError;
    }
  };

  return (
    <CanvasToolContext.Provider
      value={{
        currentColor,
        currentMode,
        changeColor,
        changeMode,
        handlePaint,
      }}
    >
      {children}
    </CanvasToolContext.Provider>
  );
};

export default CanvasToolProvider;
