import { useEffect, useRef } from "react";
import { GRID_SIZE, PIXEL_SIZE } from "@/lib/constants";
import { useCanvas } from "@/contexts/CanvasContext";

const SubCanvas = () => {
  const subCanvasRef = useRef<HTMLCanvasElement>(null);
  const { currentCoord, drawHoverPoint, handleHover, handleLeave } =
    useCanvas();

  useEffect(() => {
    const canvas = subCanvasRef.current;
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
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (currentCoord) drawHoverPoint(ctx, currentCoord);
  }, [currentCoord, drawHoverPoint]);

  return (
    <canvas
      className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      ref={subCanvasRef}
      id="sub-canvas"
      onMouseMove={(e) => handleHover({ e, canvasRef: subCanvasRef })}
      onMouseLeave={handleLeave}
      aria-label="Canvas overlay for pixel selection"
    />
  );
};

export default SubCanvas;
