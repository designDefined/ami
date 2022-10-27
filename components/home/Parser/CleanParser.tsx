import { Edge } from "../../../store/base/edge";
import { MarkDown } from "../../../store/base/markDown";
import styles from "./CleanParser.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface Props {
  markDown: MarkDown;
}

const CleanParser = ({ markDown }: Props) => {
  const { type, innerText } = markDown;
  switch (type) {
    case "p":
      return <p className={cx("clean", "p")}>{innerText}</p>;
    case "h1":
      return <h1 className={cx("clean", "h1")}>{innerText}</h1>;
    case "h2":
      return <h2 className={cx("clean", "h2")}>{innerText}</h2>;
    case "h3":
      return <h3 className={cx("clean", "h3")}>{innerText}</h3>;
    case "h4":
      return <h4 className={cx("clean", "h4")}>{innerText}</h4>;
    default:
      return <div>{innerText}</div>;
  }
};

export default CleanParser;
