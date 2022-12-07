import styles from "./LineToggleButton.module.scss";
import classNames from "classnames/bind";

interface Props {
  isOpen: boolean;
  isVertical: boolean;
  isReversed: boolean;
}

const cx = classNames.bind(styles);

const LineToggleButton = ({ isOpen, isVertical, isReversed }: Props) => (
  <div
    className={cx("LineToggleButton", {
      isOpen: isOpen,
      isVertical: isVertical,
      isReversed: isReversed,
    })}
  >
    <span className={cx("arrow", "left")} />
    <span className={cx("arrow", "right")} />
  </div>
);

export default LineToggleButton;
