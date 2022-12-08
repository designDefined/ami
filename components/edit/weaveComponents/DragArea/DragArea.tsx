import { useCursor } from "../../../../store/cursor";
import styles from "./DragArea.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../types/base";
import { TextAtomDragTarget } from "./DragTarget";
import { useDragGuide } from "../../../../store/dragGuide";

const cx = classNames.bind(styles);

export const MainDragArea = () => {
  const { status, current, interactionKey, x, y } = useCursor((state) => state);
  const { guideVertical, guideHorizontal } = useDragGuide((state) => state);
  const { type, data } = current;

  return status === "drag" ? (
    <div className={cx("DragArea")}>
      {type === "atom" && <TextAtomDragTarget x={x} y={y} atom={data} />}
      {guideVertical && (
        <div
          className={cx("guide", "vertical")}
          style={{ left: guideVertical }}
        />
      )}
      {guideHorizontal && (
        <div
          className={cx("guide", "horizontal")}
          style={{ top: guideHorizontal }}
        />
      )}
    </div>
  ) : (
    <div className={cx("noDrag")} />
  );
};
