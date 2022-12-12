import { IAtom } from "../../../types/old/base";
import styles from "./ReadComponents.module.scss";
import classNames from "classnames/bind";

interface Props {
  atom: IAtom;
}

const cx = classNames.bind(styles);

const Atom = ({ atom }: Props) => {
  const { id, markdown, content } = atom;
  const { type: markdownType } = markdown;
  switch (markdownType) {
    case "p":
      return (
        <p id={id} className={cx("clean", "p")}>
          {content}
        </p>
      );
    case "h1":
      return (
        <h1 id={id} className={cx("clean", "h1")}>
          {content}
        </h1>
      );
    case "h2":
      return (
        <h2 id={id} className={cx("clean", "h2")}>
          {content}{" "}
        </h2>
      );
    case "h3":
      return (
        <h3 id={id} className={cx("clean", "h3")}>
          {content}{" "}
        </h3>
      );
    case "h4":
      return (
        <h4 id={id} className={cx("clean", "h4")}>
          {content}{" "}
        </h4>
      );
    default:
      return <div> {content}</div>;
  }
};

export default Atom;
