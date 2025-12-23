import { useAuth, useCanvasTool, useLogger } from "@/hooks";
import { Button } from "../ui/button";
import { http } from "@/lib/http";
import type { PixelRequest } from "@/lib/types";

const DEMO_COLORS = [
  "#f65356",
  "#a5de94",
  "#6ec6ff",
  "#ffd54f",
  "#ba68c8",
  "#ff8a65",
  "#4db6ac",
  "#9575cd",
  "#81c784",
  "#e57373",
];

const DemoTool = () => {
  const { addLog } = useLogger();
  const { currentMode } = useCanvasTool();
  const { currentUsername } = useAuth();

  const handleSend50 = async () => {
    if (!currentUsername) return addLog("ERROR", "Username is required");

    const requests = Array.from({ length: 50 }).map((_, i) => {
      const color = DEMO_COLORS[i % DEMO_COLORS.length];

      return http
        .post("/pixels/paint", {
          x: 50,
          y: 50,
          color,
          updatedBy: currentUsername,
          mode: currentMode,
        } as PixelRequest)
        .then(() => addLog("DEMO", `#${i + 1} painted ${color}`))
        .catch((err) =>
          addLog("DEMO", `#${i + 1} failed (${err.response?.status ?? "ERR"})`)
        );
    });

    await Promise.allSettled(requests);
  };

  return (
    <section>
      <h1>Demo Tools</h1>

      <Button
        variant={"destructive"}
        className="w-full rounded cursor-pointer"
        onClick={handleSend50}
      >
        Send 50 requests to (50,50)
      </Button>
    </section>
  );
};

export default DemoTool;
