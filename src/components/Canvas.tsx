import { useEffect, useRef } from "react";
import { CANVAS_COLORS, CANVAS_CONFIG } from "@/lib/constants";

// ============================================================================
// Types
// ============================================================================

interface CanvasProps {
  gridSize: number;
  pixelSize: number;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Main canvas component that renders the pixel grid background
 */
const Canvas = ({ gridSize, pixelSize }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = gridSize * pixelSize;
    const height = gridSize * pixelSize;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Get 2D context with performance optimizations
    const ctx = canvas.getContext("2d", {
      alpha: CANVAS_CONFIG.contextAlpha,
      desynchronized: CANVAS_CONFIG.contextDesynchronized,
    });

    if (!ctx) return;

    // Configure for crisp pixel rendering
    ctx.imageSmoothingEnabled = CANVAS_CONFIG.imageSmoothingEnabled;

    // Clear and fill background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = CANVAS_COLORS.background;
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = CANVAS_COLORS.gridLine;
    ctx.lineWidth = CANVAS_CONFIG.gridLineWidth;

    for (let i = 0; i <= gridSize; i++) {
      const pos = i * pixelSize;

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
    }
  }, [gridSize, pixelSize]);

  return <canvas ref={canvasRef} id="canvas" aria-label="Pixel canvas" />;
};

export default Canvas;
