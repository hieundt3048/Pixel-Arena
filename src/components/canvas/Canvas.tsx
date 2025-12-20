import { useCanvas } from "@/contexts/CanvasContext";
import { GRID_SIZE, PIXEL_SIZE } from "@/lib/constants";
import { useEffect, useRef } from "react";

const fillRect = (
  ctx: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number
) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = useCanvas();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = GRID_SIZE * PIXEL_SIZE;
    const height = GRID_SIZE * PIXEL_SIZE;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines on top
    ctx.strokeStyle = "#F0F0F0";
    ctx.lineWidth = 1;

    [...Array(GRID_SIZE).keys()].forEach((i) => {
      const pos = i * PIXEL_SIZE;

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, height);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(width, pos);
      ctx.stroke();
    });

    if (!data) return;

    for (const pixel of data)
      if (pixel.color !== "#FFFFFF")
        fillRect(ctx, pixel.color, pixel.x, pixel.y);
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="w-full h-full"
      aria-label="Pixel canvas"
    />
  );
};

export default Canvas;
