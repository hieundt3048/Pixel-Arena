import { useCanvas } from "@/hooks/useCanvas";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const PixelHistory = () => {
  // TODO: Delete pin if close history
  // TODO: Add more information from backend
  const { currentPin } = useCanvas();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const setState = () => setOpen(true);

    setState();
  }, [currentPin]);

  const isVisible = Boolean(currentPin) && open;

  if (!isVisible || !currentPin) return null;

  return (
    <div id="pixel-history" className="space-y-3">
      <h1>
        PIXEL | X: {currentPin.x} | Y: {currentPin.y}
      </h1>

      <Button
        onClick={() => setOpen(false)}
        variant="secondary"
        size="sm"
        className="w-full rounded cursor-pointer"
      >
        Close
      </Button>
    </div>
  );
};

export default PixelHistory;
