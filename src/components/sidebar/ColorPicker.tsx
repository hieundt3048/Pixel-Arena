import { COLORS_PALETTE } from "@/lib/constants";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAuth, useCanvas, useCanvasTool } from "@/hooks";
import type { AppError, PixelUpdateMessage } from "@/lib/types";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useState } from "react";

const ColorPicker = () => {
  const { selectedPos } = useCanvas();
  const { currentUsername } = useAuth();
  const { currentColor, changeColor, handlePaint } = useCanvasTool();
  const [customColor, setCustomColor] = useState("");

  const handleCustomColorChange = (value: string) => {
    setCustomColor(value);
    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      changeColor({ label: "Custom", value: value });
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h1>Color Picker</h1>
        <div className="flex items-center gap-2">
          <div 
            className="size-8 rounded border-2 border-border"
            style={{ backgroundColor: currentColor.value }}
          />
          <Input
            type="text"
            value={customColor || currentColor.value.toUpperCase()}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            placeholder="#000000"
            className="w-24 h-8 text-xs font-mono uppercase"
            maxLength={7}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 grid-rows-2 gap-3">
        {COLORS_PALETTE.map((color) => {
          const isActive = currentColor.value === color.value;

          return (
            <div
              onClick={() => {
                changeColor(color);
                setCustomColor("");
              }}
              key={color.label + color.value}
              className={cn(
                "size-10 cursor-pointer rounded",
                "ring-2 ring-transparent transition",
                isActive && "ring-accent-foreground scale-105"
              )}
              style={{ backgroundColor: color.value }}
            />
          );
        })}
      </div>

      <Button
        className="w-full rounded cursor-pointer"
        disabled={!selectedPos || !currentUsername}
        onClick={() => {
          if (selectedPos)
            toast.promise<PixelUpdateMessage>(handlePaint(selectedPos), {
              loading: "Processing...",
              success: (data) => {
                const res = data as PixelUpdateMessage;

                return `Success - ${res.x} | ${res.y}`;
              },
              error: (data) => {
                const res = data as AppError;

                return `${res.message}`;
              },
            });
        }}
      >
        Paint
      </Button>
    </section>
  );
};

export default ColorPicker;
