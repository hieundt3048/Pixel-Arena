import { useCanvas } from "@/contexts/CanvasContext";
import { GRID_SIZE, PIXEL_SIZE } from "@/lib/constants";
import { useEffect, useRef } from "react";

const MarkerCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentPoint } = useCanvas();

  // TODO: Get history & show history popup

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = GRID_SIZE * PIXEL_SIZE;
    const height = GRID_SIZE * PIXEL_SIZE;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!currentPoint) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "#00132d";
    ctx.fillRect(
      currentPoint.x * PIXEL_SIZE,
      currentPoint.y * PIXEL_SIZE,
      10,
      10
    );
  }, [currentPoint]);

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
