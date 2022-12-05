import styles from "./Weave.module.scss";
import classNames from "classnames/bind";
import { useProject } from "../../../store/project";
import Sidebar from "./Sidebar/Sidebar";
import Page from "./Page/Page";
import PageMap from "./Page/PageMap";
import { MainDragArea } from "./DragArea/DragArea";
import { useCursor } from "../../../store/cursor";
import { onDrag, onReleaseAtom } from "../handlers/weaveEventHandler";

const cx = classNames.bind(styles);

const Weave = () => {
  const pages = useProject((state) => state.pages);
  const pageStatus = useProject((state) => state.pageStatus);

  return (
    <section
      className={cx("Weave")}
      onMouseMove={onDrag()}
      onMouseUp={onReleaseAtom()}
    >
      <Sidebar pages={pages} />
      {pageStatus < 0 ? (
        <PageMap pages={pages} />
      ) : (
        <Page page={pages[pageStatus]} />
      )}
      <MainDragArea />
    </section>
  );
};

export default Weave;
