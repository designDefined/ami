import styles from "./DragArea.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../types/base";
import { CSSProperties, useEffect, useMemo } from "react";
import createStyle from "../../../../functions/create/createStyle";

const cx = classNames.bind(styles);

interface TextAtomProps {
  x: number;
  y: number;
  atom: IAtom;
}

export const TextAtomDragTarget = ({ x, y, atom }: TextAtomProps) => {
  const { content } = atom;
  const atomStyle = useMemo(
    (): CSSProperties => createStyle.atom(atom, { is: true, x, y }),
    [atom, x, y],
  );

  return (
    <div className={cx("DragTarget", "textAtom")} style={atomStyle}>
      {content}
    </div>
  );
};
