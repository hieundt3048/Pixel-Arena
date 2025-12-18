import type { PixelPosition } from "@/lib/constants";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

interface CanvasProps {
  gridSize: number;
  pixelSize: number;
  position: PixelPosition | null;
  setPosition: Dispatch<SetStateAction<PixelPosition | null>>;
}

const Canvas = ({ gridSize, pixelSize }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, [gridSize, pixelSize]);

  return <canvas ref={canvasRef} id="canvas" />;
};

export default Canvas;
