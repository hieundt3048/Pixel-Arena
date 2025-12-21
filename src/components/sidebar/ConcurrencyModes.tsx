import { CONCURRENCY_MODES } from "@/lib/constants";

import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePaintTool } from "@/hooks/usePaintTool";

const ConcurrencyModes = () => {
  const { currentMode, changeMode } = usePaintTool();

  return (
    <section className="space-y-1">
      <h1>Concurrency Modes</h1>

      <RadioGroup
        value={currentMode}
        onValueChange={changeMode}
        className="space-y-1"
      >
        {CONCURRENCY_MODES.map((mode) => (
          <div
            key={mode.value}
            className={cn(
              "flex items-center space-x-2 border rounded p-3 cursor-pointer transition-colors hover:bg-accent",
              currentMode === mode.value && "border bg-accent"
            )}
            onClick={() => changeMode(mode.value)}
          >
            <RadioGroupItem value={mode.value} id={mode.value} />
            <Label htmlFor={mode.value} className="cursor-pointer">
              {mode.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </section>
  );
};

export default ConcurrencyModes;
