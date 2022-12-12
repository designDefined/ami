import { IAtom, IPage } from "../../types/old/base";
import { CSSProperties } from "react";
import { size } from "lodash";

const page = ({ offsetHeight, backgroundColor }: IPage): CSSProperties => ({
  //size
  height: offsetHeight,
  background: backgroundColor,
});

const pageSymbol = (
  { placedX, placedY, symbolColor }: IPage,
  transform: { is: boolean; x: number; y: number } = { is: false, x: 0, y: 0 },
): CSSProperties => {
  const position: CSSProperties = transform.is
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : { top: `${placedY}px`, left: `${placedX}px` };
  const basics: CSSProperties = {
    backgroundColor: symbolColor,
  };

  return { ...position, ...basics };
};

const atom = (
  {
    //position
    placedX,
    placedY,
    //size
    offsetWidth,
    offsetPadding,
    //font
    fontFamily,
    fontSize,
    fontColor,
    fontWeight,
    textAlign,
    //background
    backgroundColor,
    //border
    borderColor,
    borderWidth,
    borderRadius,
    //layer
    layer,
  }: IAtom,
  transform: { is: boolean; x: number; y: number } = { is: false, x: 0, y: 0 },
): CSSProperties => {
  const position: CSSProperties = transform.is
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : { top: `${placedY}px`, left: `${placedX}px` };
  const basics: CSSProperties = {
    //size
    width: `${offsetWidth}px`,
    padding: `${offsetPadding}px`,
    //font
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight: `${fontWeight}`,
    color: fontColor,
    textAlign: textAlign,
    //background
    background: backgroundColor,
    //border
    //layer
    zIndex: layer,
  };
  return { ...position, ...basics };
};

const createStyle = { page, pageSymbol, atom };

export default createStyle;
