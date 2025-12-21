import { X } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";

const PixelHistory = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  if (!open) return null;

  return (
    <div id="pixel-history">
      <h1>PIXEL | X: 50 | Y: 50</h1>

      <button onClick={() => setOpen(false)} className="absolute right-1 top-1">
        <X size={16} />
      </button>
    </div>
  );
});

export default PixelHistory;
