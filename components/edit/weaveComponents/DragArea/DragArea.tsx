import { useCursor } from "../../../../store/cursor";
import styles from "./DragArea.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const MainDragArea = () => {
  const { status, current, interactionKey, x, y } = useCursor((state) => state);
  const { type, data } = current;

  return (
    <div className={cx("DragArea")}>
      {type === "atom" && (
        <div
          className={cx("DragTarget", "dummy")}
          style={{ transform: `translate(${x}px, ${y}px)` }}
        >
          {interactionKey.length > 0 && interactionKey[0]}
        </div>
      )}
    </div>
  );
};
