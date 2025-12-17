import RootLayout from "@/layouts/RootLayout";
import { Canvas } from "@/lib/canvas";
import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasInstanceRef = useRef<Canvas | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasInstance = new Canvas(canvas, 100, 10);
    canvasInstance.initialize();
    canvasInstanceRef.current = canvasInstance;
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasInstanceRef.current) canvasInstanceRef.current.paint(e);
  };

  return (
    <RootLayout>
      <canvas className="border" ref={canvasRef} onClick={handleClick} />
    </RootLayout>
  );
}

export default App;
