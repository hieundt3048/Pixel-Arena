import { useEffect, useRef } from "react";
import { useCanvas } from "@/hooks/useCanvas";

const HoverCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    currentPos,
    onMouseMove,
    onMouseLeave,
    drawHoverPoint,
    drawBase,
    onMouseClick,
  } = useCanvas();

  useEffect(() => drawBase(canvasRef), [drawBase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (currentPos) drawHoverPoint(ctx, currentPos);
  }, [currentPos, drawHoverPoint]);

  return (
    <canvas
      className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      ref={canvasRef}
      id="sub-canvas"
      onClick={(e) => onMouseClick({ e, canvasRef: canvasRef })}
      onMouseMove={(e) => onMouseMove({ e, canvasRef: canvasRef })}
      onMouseLeave={onMouseLeave}
      aria-label="Canvas overlay for pixel selection"
    />
  );
};

export default HoverCanvas;
