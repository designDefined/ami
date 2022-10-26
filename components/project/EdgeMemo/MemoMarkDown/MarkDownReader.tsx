import styles from "./MemoMarkDown.module.scss";
import { MarkDown } from "../../../../store/base/markDown";
import classNames from "classnames/bind";
import { handleClickMD } from "./MarkDownEventHandler";

interface Props {
  source: MarkDown;
}
const cx = classNames.bind(styles);

const MemoMarkDownReader = ({ source }: Props) => {
  const { type, innerText, depth } = source;

  return (
    <li
      className={cx("MarkDown", "reader", type, "depth-" + depth)}
      onClick={handleClickMD(source)}
    >
      {innerText}
    </li>
  );
};

export default MemoMarkDownReader;
