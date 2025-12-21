import { BoardContext } from "@/contexts/BoardContext";
import { http } from "@/lib/http";
import type { PixelRecord } from "@/lib/types";
import { useEffect, useState } from "react";

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<PixelRecord[] | null>(null);
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

  return (
    <BoardContext.Provider value={{ data, loading }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
