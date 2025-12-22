import { useLogger } from "@/hooks";
import { Button } from "../ui/button";
import ColorPicker from "./ColorPicker";
import ConcurrencyModes from "./ConcurrencyModes";

const Sidebar = () => {
  const { logs } = useLogger();

  return (
    <div
      className="border rounded w-90 p-3 flex flex-col gap-1 h-full"
      id="sidebar"
    >
      {/* Color Picker */}
      <ColorPicker />

      {/* Concurrency Modes */}
      <ConcurrencyModes />

      {/* Demo Tools */}
      <section className="space-y-1">
        <h1>Demo Tools</h1>

        <Button
          variant={"destructive"}
          className="w-full rounded cursor-pointer"
          size={"lg"}
        >
          Send 50 requests to (50,50)
        </Button>
      </section>

      {/* Logs */}
      <section className="flex flex-col flex-1 gap-3 min-h-0">
        <h1>Logs</h1>

        <div className="flex-1 text-sm overflow-y-auto space-y-1 p-1 scrollbar-none bg-neutral-100 outline">
          {logs.map((log, i) => (
            <p key={i}>{log}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
