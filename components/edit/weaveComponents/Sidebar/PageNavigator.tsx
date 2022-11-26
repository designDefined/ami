import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { IPage } from "../../../../types/base";
import { useProject } from "../../../../store/project";
import { useRef, useState } from "react";
import { onChangePage } from "../../handlers/weaveEventHandler";

const cx = classNames.bind(styles);

interface Props {
  pages: IPage[];
}

const PageNavigator = ({ pages }: Props) => {
  const pageStatus = useProject((state) => state.pageStatus);
  const formRef = useRef<HTMLFormElement>(null);
  const [pageInput, setPageInput] = useState<number>(pageStatus + 1);

  return (
    <div className={cx("PageNavigator")}>
      <div className={cx("navLabel")}>페이지 이동</div>
      <form
        className={cx("nav")}
        onSubmit={onChangePage(pageInput, pages.length)}
        ref={formRef}
      >
        <button className={cx("navButton", "prev")}>이전</button>
        <div className={cx("pageNumber")}>
          <input
            className={cx("currentPage")}
            value={pageInput}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (Number.isInteger(num)) setPageInput(Number(num));
            }}
          />
          <span>/</span> <span>{pages.length}</span>
        </div>
        <button className={cx("navButton", "next")}>다음</button>
      </form>
    </div>
  );
};
export default PageNavigator;
