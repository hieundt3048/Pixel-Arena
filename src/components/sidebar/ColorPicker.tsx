import { COLORS_PALETTE } from "@/lib/constants";
import { Button } from "../ui/button";

const ColorPicker = () => {
  // TODO: Handle paint
  return (
    <section className="space-y-3">
      <h1>Color Picker</h1>

      <div className="grid grid-cols-5 grid-rows-2 gap-2">
        {COLORS_PALETTE.map((color) => (
          <div
            key={color.label + color.value}
            className="aspect-square"
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>

      <div className="bg-secondary w-full border p-3 rounded text-center font-medium text-sm">
        Current Color ( #FFFFFF )
      </div>

      <Button className="w-full bg-[#1c1c1c]">Paint</Button>
    </section>
  );
};

export default ColorPicker;
