import { CanvasContext } from "@/contexts/CanvasContext";
import { GRID_SIZE, PIXEL_SIZE } from "@/lib/constants";
import { http } from "@/lib/http";
import {
  type CanvasFuncProps,
  type PixelCoord,
  type PixelRecord,
} from "@/lib/types";
import { useCallback, useEffect, useState, type ReactNode } from "react";

const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PixelRecord[] | null>(null);
  const [currentCoord, setCurrentCoord] = useState<PixelCoord | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const res = await http.get("/pixels");
        if (res.status !== 200) throw new Error("failed to load data");

        setData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const getCoords = ({ e, canvasRef }: CanvasFuncProps): PixelCoord | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / PIXEL_SIZE);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / PIXEL_SIZE);

    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;

    return { x, y };
  };

  const drawHoverPoint = (
    ctx: CanvasRenderingContext2D,
    coords: PixelCoord
  ) => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    const baseX = coords.x * PIXEL_SIZE;
    const baseY = coords.y * PIXEL_SIZE;

    const px = (x: number, y: number, w = 1, h = 1) => {
      ctx.fillRect(baseX + x, baseY + y, w, h);
    };

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "#00132d";
    px(0, 0, PIXEL_SIZE, PIXEL_SIZE);
  };

  const handleHover = useCallback(
    (props: CanvasFuncProps) => {
      const coords = getCoords(props);

      if (coords) setCurrentCoord(coords);
    },
    [setCurrentCoord]
  );

  const handleLeave = useCallback(
    () => setCurrentCoord(null),
    [setCurrentCoord]
  );

  const value = {
    data,
    loading,
    currentCoord,
    drawHoverPoint,
    handleHover,
    handleLeave,
  };
  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};

export default CanvasProvider;
