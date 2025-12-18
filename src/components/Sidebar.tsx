import { useState } from "react";
import { Button } from "./ui/button";

// Color palette with 8 colors
const COLOR_PALETTE = [
  "#000000", // Black
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFFFFF", // White
];

// Concurrency modes
const CONCURRENCY_MODES = [
  { value: "no-lock", label: "No Lock" },
  { value: "pessimistic", label: "Pessimistic Lock" },
  { value: "optimistic", label: "Optimistic Lock" },
] as const;

type ConcurrencyMode = (typeof CONCURRENCY_MODES)[number]["value"];

const Sidebar = () => {
  const [currentColor, setCurrentColor] = useState<string>(COLOR_PALETTE[0]);
  const [concurrencyMode, setConcurrencyMode] =
    useState<ConcurrencyMode>("no-lock");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  const handleDemoTool = () => {
    addLog("Demo tool button clicked");
  };

  return (
    <div className="p-4 border rounded w-96 h-full flex flex-col gap-6 overflow-y-auto">
      {/* Color Picker Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Color Picker</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Current Color:
            </span>
            <div
              className="w-8 h-8 border-2 border-border rounded"
              style={{ backgroundColor: currentColor }}
            />
            <span className="text-sm font-mono">{currentColor}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {COLOR_PALETTE.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setCurrentColor(color);
                  addLog(`Color changed to ${color}`);
                }}
                className={`w-12 h-12 rounded border-2 transition-all hover:scale-110 ${
                  currentColor === color
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary/50"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Concurrency Mode Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Concurrency Mode</h2>
        <div className="space-y-2">
          {CONCURRENCY_MODES.map((mode) => (
            <label
              key={mode.value}
              className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
            >
              <input
                type="radio"
                name="concurrency-mode"
                value={mode.value}
                checked={concurrencyMode === mode.value}
                onChange={(e) => {
                  setConcurrencyMode(e.target.value as ConcurrencyMode);
                  addLog(`Concurrency mode changed to ${mode.label}`);
                }}
                className="w-4 h-4"
              />
              <span className="text-sm">{mode.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Demo Tools Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Demo Tools</h2>
        <div>
          <Button onClick={handleDemoTool} variant="outline" className="w-full">
            Demo Tool
          </Button>
        </div>
      </div>

      {/* Console Logs Section */}
      <div className="space-y-3 flex-1 flex flex-col min-h-0">
        <h2 className="text-lg font-semibold">Console Logs</h2>
        <div className="flex-1 bg-muted rounded p-3 overflow-y-auto font-mono text-xs space-y-1">
          {logs.length === 0 ? (
            <div className="text-muted-foreground">No logs yet...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-foreground/80">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
