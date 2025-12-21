import { PaintToolContext } from "@/contexts/PaintToolContext";
import { COLORS_PALETTE } from "@/lib/constants";
import { http } from "@/lib/http";
import type {
  ColorPalette,
  ConcurrencyMode,
  PixelCoord,
  PixelRequest,
  User,
} from "@/lib/types";
import type React from "react";
import { useState } from "react";

const PaintToolProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: Handle paint
  const [currentColor, setCurrentColor] = useState<ColorPalette>(
    COLORS_PALETTE[0]
  );
  const [currentMode, setCurrentMode] =
    useState<ConcurrencyMode["value"]>("NONE");

  const changeColor = (color: ColorPalette) => setCurrentColor(color);
  const changeMode = (value: string) =>
    setCurrentMode(value as ConcurrencyMode["value"]);

  const handlePaint = async (currentPin: PixelCoord, user: User) => {
    const data: PixelRequest = {
      ...currentPin,
      updatedBy: user.username,
      color: currentColor.value,
      mode: currentMode,
    };

    try {
      const res = await http.post("/pixels/paint", data);

      if (res.status !== 200) throw new Error("failed while processing data");

      console.log(res.data);

      // TODO: Redraw if success
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PaintToolContext.Provider
      value={{
        currentColor,
        currentMode,
        changeColor,
        changeMode,
        handlePaint,
      }}
    >
      {children}
    </PaintToolContext.Provider>
  );
};

export default PaintToolProvider;
