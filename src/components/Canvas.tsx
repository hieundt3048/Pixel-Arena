import { GRID_SIZE, PIXEL_SIZE } from "@/lib/constants";
import { useEffect, useRef } from "react";

const drawBase = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  // Clear background
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  // Draw grid lines
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
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = GRID_SIZE * PIXEL_SIZE;
    const height = GRID_SIZE * PIXEL_SIZE;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    drawBase(ctx, width, height);
  }, []);

  return <canvas ref={canvasRef} id="canvas" aria-label="Pixel canvas" />;
};

export default Canvas;
