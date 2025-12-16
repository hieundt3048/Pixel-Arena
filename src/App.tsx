import PixelCanvas from "@/components/PixelCanvas";
import { useEffect, useState } from "react";
import type { Pixel } from "@/lib/constants";
import { http } from "@/lib/http";
import Loading from "@/components/Loading";

const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 100;
const CANVAS_SCALE = 8;

function App() {
  const [pixels, setPixels] = useState([] as Pixel[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const res = await http.get("/pixels");

        setPixels(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <PixelCanvas
        pixels={pixels}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        scale={CANVAS_SCALE}
      />
    </div>
  );
}

export default App;
