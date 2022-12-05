import { useCursor } from "../../../../store/cursor";
import styles from "./DragArea.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../types/base";
import { TextAtomDragTarget } from "./DragTarget";

const cx = classNames.bind(styles);

export const MainDragArea = () => {
  const { status, current, interactionKey, x, y } = useCursor((state) => state);
  const { type, data } = current;

  return (
    <div className={cx("DragArea")}>
      {type === "atom" && <TextAtomDragTarget x={x} y={y} atom={data} />}
    </div>
  );
};
