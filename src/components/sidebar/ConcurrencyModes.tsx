import { CONCURRENCY_MODES } from "@/lib/constants";
import type { ConcurrencyMode } from "@/lib/types";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ConcurrencyModes = () => {
  const [currentMode, setCurrentMode] =
    useState<ConcurrencyMode["value"]>("NONE");

  return (
    <section className="space-y-1">
      <h1>Concurrency Modes</h1>

      <RadioGroup
        value={currentMode}
        onValueChange={(value) =>
          setCurrentMode(value as ConcurrencyMode["value"])
        }
        className="space-y-1"
      >
        {CONCURRENCY_MODES.map((mode) => (
          <div
            key={mode.value}
            className={cn(
              "flex items-center space-x-2 border rounded p-3 cursor-pointer transition-colors hover:bg-accent",
              currentMode === mode.value && "border bg-accent"
            )}
            onClick={() => setCurrentMode(mode.value)}
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
