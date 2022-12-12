import { CSSProperties } from "react";
import { IPage } from "../../types/page";

const buildPageStyle = ({
  offsetHeight,
  backgroundColor,
}: IPage): CSSProperties => ({
  height: offsetHeight,
  background: backgroundColor,
});

export const buildPageSymbolStyle = (
  { placedX, placedY, backgroundColor }: IPage,
  isDragged: false | { x: number; y: number },
): CSSProperties => ({
  transform: isDragged
    ? `translate(${isDragged.x}px,${isDragged.y}px)`
    : `translate(${placedX}px,${placedY}px)`,
  background: backgroundColor,
});

export default buildPageStyle;
