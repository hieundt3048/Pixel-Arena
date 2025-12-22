import { COLORS_PALETTE } from "@/lib/constants";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAuth, useCanvas, useCanvasTool } from "@/hooks";

const ColorPicker = () => {
  const { selectedPos } = useCanvas();
  const { currentUsername } = useAuth();
  const { currentColor, changeColor, handlePaint } = useCanvasTool();

  return (
    <section className="space-y-1">
      <h1>Color Picker</h1>

      <div className="grid grid-cols-5 grid-rows-2 gap-2">
        {COLORS_PALETTE.map((color) => {
          const isActive = currentColor.value === color.value;

          return (
            <div
              onClick={() => changeColor(color)}
              key={color.label + color.value}
              className={cn(
                "aspect-square cursor-pointer rounded",
                "ring-2 ring-transparent transition",
                isActive && "ring-accent-foreground scale-105"
              )}
              style={{ backgroundColor: color.value }}
            />
          );
        })}
      </div>

      <div className="bg-secondary w-full border p-2 rounded text-center font-medium text-sm">
        Color ( {currentColor.value.toUpperCase()} )
      </div>

      <Button
        className="w-full rounded cursor-pointer"
        disabled={!selectedPos || !currentUsername}
        onClick={() => selectedPos && handlePaint(selectedPos)}
        // onClick={() => {
        //   if (selectedPos)
        //     toast.promise<PixelUpdateMessage | AppError>(
        //       handlePaint(selectedPos),
        //       {
        //         loading: "Processing...",
        //         success: (data) => {
        //           const res = data as PixelUpdateMessage;

        //           return `Success - ${res.x} | ${res.y}`;
        //         },
        //         error: (data) => {
        //           const res = data as AppError;

        //           return `${res.message}`;
        //         },
        //       }
        //     );
        // }}
      >
        Paint
      </Button>
    </section>
  );
};

export default ColorPicker;
