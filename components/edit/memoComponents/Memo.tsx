import Page from "./Page";
import Hint from "../Hint/Hint";
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
      {/*<Saver />*/}
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
        <button className={cx("addPage")}>페이지 추가하기 +</button>
      </ReactParallaxTilt>
      <Hint />
    </section>
  );
};

export default Memo;
