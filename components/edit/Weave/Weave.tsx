import styles from "./Weave.module.scss";
import classNames from "classnames/bind";
import { useProject } from "../../../store/project";
import Page from "./Page/Page";
import PageMap from "./PageMap/PageMap";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect } from "react";
import { useSelection } from "../../../store/selection";

const cx = classNames.bind(styles);

const Weave = () => {
  const pages = useProject((state) => state.pages);
  const pageStatus = useProject((state) => state.pageStatus);
  const deselect = useSelection((state) => state.deselect);
  useEffect(() => {
    deselect();
  }, [pageStatus]);

  return (
    <section className={cx("Weave")}>
      <Sidebar pages={pages} pageStatus={pageStatus} />
      {pageStatus < 0 ? (
        <PageMap pages={pages} />
      ) : (
        <Page page={pages[pageStatus]} />
      )}
    </section>
  );
};

export default Weave;
