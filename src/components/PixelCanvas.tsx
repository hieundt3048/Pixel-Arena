import { drawPixel } from "@/lib/canvas";
import type { PixelCanvasProps } from "@/lib/constants";
import { http } from "@/lib/http";
import { hexToRgb } from "@/lib/utils";
import { useEffect, useRef } from "react";

const PixelCanvas = ({ pixels, width, height, scale }: PixelCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Initialize all pixels to white (or transparent)
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255; // R
      data[i + 1] = 255; // G
      data[i + 2] = 255; // B
      data[i + 3] = 255; // A
    }

    for (const pixel of pixels) {
      const index = (pixel.y * width + pixel.x) * 4;
      if (index >= 0 && index < data.length - 3) {
        const [r, g, b] = hexToRgb(pixel.color);
        data[index] = r; // R
        data[index + 1] = g; // G
        data[index + 2] = b; // B
        data[index + 3] = 255; // A
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [pixels, width, height, scale]);

  const handleClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Calculate scale
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Calculate possition
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    console.log(x);
    console.log(y);

    // Paint pixel here

    try {
      const data = {
        x,
        y,
        color: "#EF476F",
        updatedBy: "User A",
        mode: "NONE",
      };

      const res = await http.post("/pixels/paint", data);

      console.log(res.data);

      ctx.fillStyle = "#EF476F";
      // Fill the pixel with the color
      // With 1x1 size ( maybe 10x10 size )
      ctx.fillRect(x, y, 1, 1);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="border rounded p-3">
      <canvas ref={canvasRef} id="pixel-canvas" onClick={handleClick} />
    </div>
  );
};

export default PixelCanvas;
