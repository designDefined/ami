import { IPage } from "../../../types/base";
import Page from "./Page";
import Hint from "../Hint/Hint";
import Saver from "../Saver/Saver";
import styles from "./MemoComponents.module.scss";
import classNames from "classnames/bind";
import ReactParallaxTilt from "react-parallax-tilt";
import { handleAddPage } from "../handlers/AtomEventHandler";

const cx = classNames.bind(styles);

interface Props {
  pages: IPage[];
}

const Memo = ({ pages }: Props) => (
  <section className={cx("Memo")}>
    <Saver />
    {pages.map((page) => (
      <Page key={page.id} page={page} />
    ))}
    <ReactParallaxTilt
      tiltReverse
      glareEnable={false}
      perspective={3000}
      transitionSpeed={8000}
      tiltAxis="y"
    >
      <button className={cx("addPage")} onClick={handleAddPage}>
        페이지 추가하기 +
      </button>
    </ReactParallaxTilt>
    <Hint />
  </section>
);

export default Memo;
