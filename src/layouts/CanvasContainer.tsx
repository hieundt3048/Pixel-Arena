// ============================================================================
// Types
// ============================================================================

interface CanvasContainerProps {
  children: React.ReactNode;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Container component that centers and constrains the canvas content
 */
const CanvasContainer = ({ children }: CanvasContainerProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative inline-block">{children}</div>
    </div>
  );
};

export default CanvasContainer;
