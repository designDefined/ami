import { IAtom, ITextAtom } from "../../types/atom";
import { CSSProperties } from "react";

const buildAtomStyle = (
  atom: IAtom,
  isDragged: false | { x: number; y: number },
): CSSProperties => {
  const {
    type,
    //position
    placedX,
    placedY,
    //size
    offsetWidth,
    offsetPadding,
    //layer
    layer,
  } = atom;
  const common: CSSProperties = {
    //size
    width: `${offsetWidth}px`,
    padding: `${offsetPadding}px`,
    zIndex: layer,
  };
  const position: CSSProperties = isDragged
    ? {
        transform: `translate(${isDragged.x}px, ${isDragged.y}px)`,
      }
    : { top: `${placedY}px`, left: `${placedX}px` };

  if (type === "text") {
    const {
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
    } = atom;
    const text: CSSProperties = {
      //font
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight: `${fontWeight}`,
      color: fontColor,
      textAlign: textAlign,
      //background
      background: backgroundColor,
      //border
      borderWidth,
      borderColor,
      borderRadius,
    };
    return { ...common, ...position, ...text };
  } else {
    return { ...common, ...position };
  }
};

export default buildAtomStyle;
