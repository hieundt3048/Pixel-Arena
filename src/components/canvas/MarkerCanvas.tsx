import { useCanvas } from "@/hooks/useCanvas";
import { useEffect, useRef } from "react";

const MarkerCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawBase, currentPin, drawPin } = useCanvas();

  // TODO: Get history & show history popup

  useEffect(() => drawBase(canvasRef), [drawBase]);

  useEffect(() => drawPin(canvasRef, currentPin), [currentPin, drawPin]);

  return (
    <canvas
      className="absolute top-0 left-0 w-full h-full"
      ref={canvasRef}
      id="sub-canvas"
      aria-label="Canvas overlay for pixel selection"
    />
  );
};

export default MarkerCanvas;
