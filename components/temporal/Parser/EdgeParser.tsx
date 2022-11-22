import { Edge } from "../../../nouse/base/edge";
import { MarkDown } from "../../../nouse/base/markDown";
import styles from "./EdgeParser.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface Props {
  markDown: MarkDown;
}

const EdgeParser = ({ markDown }: Props) => {
  const { id, type, innerText } = markDown;
  switch (type) {
    case "p":
      return (
        <p id={id} className={cx("clean", "p")}>
          {innerText}
        </p>
      );
    case "h1":
      return (
        <h1 id={id} className={cx("clean", "h1")}>
          {innerText}
        </h1>
      );
    case "h2":
      return (
        <h2 id={id} className={cx("clean", "h2")}>
          {innerText}
        </h2>
      );
    case "h3":
      return (
        <h3 id={id} className={cx("clean", "h3")}>
          {innerText}
        </h3>
      );
    case "h4":
      return (
        <h4 id={id} className={cx("clean", "h4")}>
          {innerText}
        </h4>
      );
    default:
      return <div>{innerText}</div>;
  }
};

export default EdgeParser;
