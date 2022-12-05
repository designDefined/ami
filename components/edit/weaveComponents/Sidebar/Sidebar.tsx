import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { useProject } from "../../../../store/project";
import { IPage } from "../../../../types/base";
import PageNavigator from "./PageNavigator/PageNavigator";
import AtomWidget from "./AtomWidget/AtomWidget";
import { PageInfo } from "./PageWidget/PageWidget";
import { useWeaveSidebarLayout } from "../../../../store/layout/weaveSidebar";

const cx = classNames.bind(styles);

interface Props {
  pages: IPage[];
}

const Sidebar = ({ pages }: Props) => {
  const pageStatus = useProject((state) => state.pageStatus);
  const sidebarStatus = useWeaveSidebarLayout((state) => state.status);
  const setSidebarStatus = useWeaveSidebarLayout((state) => state.setStatus);

  return (
    <div className={cx("wrapper", { isClosed: sidebarStatus !== "open" })}>
      <button
        className={cx("handle")}
        onClick={() => {
          if (sidebarStatus === "open") {
            setSidebarStatus("close");
          } else {
            setSidebarStatus("open");
          }
        }}
      >
        핸들
      </button>
      <PageNavigator pages={pages} />
      {pageStatus < 0 ? <div /> : <AtomWidget page={pages[pageStatus]} />}
    </div>
  );
};

export default Sidebar;
