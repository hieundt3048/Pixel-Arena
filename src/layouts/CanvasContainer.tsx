interface CanvasContainerProps {
  children: React.ReactNode;
}

const CanvasContainer = ({ children }: CanvasContainerProps) => {
  return <div className="relative border">{children}</div>;
};

export default CanvasContainer;
