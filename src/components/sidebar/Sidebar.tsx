import { Button } from "../ui/button";
import ColorPicker from "./ColorPicker";
import ConcurrencyModes from "./ConcurrencyModes";

const Sidebar = () => {
  // TODO: Add logs

  return (
    <div className="border rounded w-80 p-3 space-y-3" id="sidebar">
      {/* Color Picker */}
      <ColorPicker />

      {/* Concurrency Modes */}
      <ConcurrencyModes />

      {/* Demo Tools */}
      <section className="space-y-1">
        <h1>Demo Tools</h1>

        <Button variant={"destructive"} className="w-full" size={"lg"}>
          Send 50 requests to (50,50)
        </Button>
      </section>

      {/* Logs */}
      <section>
        <h1>Logs</h1>
      </section>
    </div>
  );
};

export default Sidebar;
