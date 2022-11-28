import { IPage } from "../../../../types/base";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropPage {
  page: IPage;
}

export const PageInfo = ({ page }: PropPage) => {
  return (
    <div className={cx("PageInfo")}>
      <div className={cx("widgetName")}>페이지 정보</div>
    </div>
  );
};
