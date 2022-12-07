import styles from "./DragArea.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../types/base";
import { useEffect } from "react";

const cx = classNames.bind(styles);

interface TextAtomProps {
  x: number;
  y: number;
  atom: IAtom;
}

export const TextAtomDragTarget = ({ x, y, atom }: TextAtomProps) => {
  const { content, offsetWidth } = atom;

  return (
    <div
      className={cx("DragTarget", "textAtom")}
      style={{ transform: `translate(${x}px, ${y}px)`, width: offsetWidth }}
    >
      {content}
    </div>
  );
};
