import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import PageNavigator from "./PageNavigator/PageNavigator";
import { useWeaveSidebarLayout } from "../../../../store/layout/weaveSidebar";
import LineToggleButton from "../../../common/Buttons/LineToggleButton/LineToggleButton";
import PageWidget from "./Widgets/PageWidget";
import { IPage } from "../../../../types/page";
import AtomWidget from "./Widgets/AtomWidget";

const cx = classNames.bind(styles);

interface Props {
  pages: IPage[];
  pageStatus: number;
}

const Sidebar = ({ pages, pageStatus }: Props) => {
  const sidebarStatus = useWeaveSidebarLayout((state) => state.status);
  const setSidebarStatus = useWeaveSidebarLayout((state) => state.setStatus);

  return (
    <div className={cx("wrapper", { isClosed: sidebarStatus !== "open" })}>
      <button
        className={cx("handle", { isClosed: sidebarStatus !== "open" })}
        onClick={() => {
          if (sidebarStatus === "open") {
            setSidebarStatus("close");
          } else {
            setSidebarStatus("open");
          }
        }}
      >
        <div className={cx("handleBg")} />
        <LineToggleButton
          isOpen={sidebarStatus === "open"}
          isVertical={false}
          isReversed={true}
        />
      </button>
      <div className={cx("container")}>
        <PageNavigator />
        {pageStatus < 0 ? (
          <PageWidget />
        ) : (
          <AtomWidget page={pages[pageStatus]} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
