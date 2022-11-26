import Page, { PageAdd } from "./Page";
import Hint from "./Hint/Hint";
import Saver from "../Saver/Saver";
import styles from "./MemoComponents.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";
import { useProject } from "../../../store/project";

const cx = classNames.bind(styles);

const Memo = () => {
  const pages = useProject((state) => state.pages);
  return (
    <section className={cx("Memo")}>
      {pages.map((page) => (
        <Page key={page.id} page={page} />
      ))}
      <PageAdd />
      <Hint />
    </section>
  );
};

export default Memo;
