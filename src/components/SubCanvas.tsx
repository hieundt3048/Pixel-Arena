import type { PixelPosition } from "@/lib/constants";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

interface SubCanvasProps {
  gridSize: number;
  pixelSize: number;
  position: PixelPosition | null;
  setPosition: Dispatch<SetStateAction<PixelPosition | null>>;
}

const getCoords = (
  e: React.MouseEvent,
  canvas: HTMLCanvasElement,
  pixelSize: number
) => {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = Math.floor(((e.clientX - rect.left) * scaleX) / pixelSize);
  const y = Math.floor(((e.clientY - rect.top) * scaleY) / pixelSize);

  return { x, y };
};

const drawOverlay = (
  ctx: CanvasRenderingContext2D,
  pixelSize: number,
  coords: PixelPosition
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const px = (x: number, y: number, w = 1, h = 1) => {
    ctx.fillRect(coords.x * pixelSize + x, coords.y * pixelSize + y, w, h);
  };

  ctx.fillStyle = "#edf2f4";
  px(0, 0, pixelSize, pixelSize);

  ctx.fillStyle = "#8d99ae";
  px(0, 0, 4, 4);
  px(6, 0, 4, 4);
  px(0, 6, 4, 4);
  px(6, 6, 4, 4);

  ctx.fillStyle = "#2b2d42";
  px(1, 1, 3, 3);
  px(6, 1, 3, 3);
  px(1, 6, 3, 3);
  px(6, 6, 3, 3);

  ctx.fillStyle = "#edf2f4";
  px(2, 2, 2, 2);
  px(6, 2, 2, 2);
  px(2, 6, 2, 2);
  px(6, 6, 2, 2);
};

const SubCanvas = ({
  gridSize,
  pixelSize,
  position,
  setPosition,
}: SubCanvasProps) => {
  const subCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, [gridSize, pixelSize]);

  useEffect(() => {
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (!position) return;
    drawOverlay(ctx, pixelSize, position);
  }, [position, pixelSize]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoords(e, canvas, pixelSize);

    setPosition(coords);
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = subCanvasRef.current;
    if (!canvas) return;

    const coords = getCoords(e, canvas, pixelSize);

    setPosition(coords);
  };

  const handleMouseLeave = () => setPosition(null);

  return (
    <canvas
      className="absolute top-0 right-0"
      ref={subCanvasRef}
      id="sub-canvas"
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default SubCanvas;
