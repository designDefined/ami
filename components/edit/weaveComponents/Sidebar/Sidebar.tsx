import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { useProject } from "../../../../store/project";
import { IPage } from "../../../../types/base";
import PageNavigator from "./PageNavigator";

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
      {pageStatus < 0 ? <div /> : <div />}
    </div>
  );
};

export default Sidebar;
