import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { useProject } from "../../../../store/project";
import { IPage } from "../../../../types/base";
import PageNavigator from "./PageNavigator";
import AtomWidget from "./AtomWidget";
import { PageInfo } from "./PageWidget";

const cx = classNames.bind(styles);

interface Props {
  pages: IPage[];
}

const Sidebar = ({ pages }: Props) => {
  const pageStatus = useProject((state) => state.pageStatus);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("handle")} />
      <PageNavigator pages={pages} />
      {pageStatus < 0 ? <div /> : <AtomWidget page={pages[pageStatus]} />}
    </div>
  );
};

export default Sidebar;
