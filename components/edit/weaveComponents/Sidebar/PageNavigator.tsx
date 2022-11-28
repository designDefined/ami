import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { IPage } from "../../../../types/base";
import { useProject } from "../../../../store/project";
import { useCallback, useRef, useState } from "react";

const cx = classNames.bind(styles);

interface Props {
  pages: IPage[];
}

const PageNavigator = ({ pages }: Props) => {
  const pageStatus = useProject((state) => state.pageStatus);
  const setPageStatus = useProject((state) => state.setPageStatus);
  const formRef = useRef<HTMLFormElement>(null);
  const [pageInput, setPageInput] = useState<number>(pageStatus + 1);

  const onChangePage = useCallback(
    (to: number): React.MouseEventHandler =>
      () => {
        if (to >= -1 && to < pages.length) {
          setPageInput(to + 1);
          setPageStatus(to);
        }
      },
    [],
  );

  return (
    <div className={cx("PageNavigator")}>
      <div className={cx("navLabel")}>페이지 이동</div>
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
        <button
          className={cx("numButton")}
          onClick={onChangePage(pageInput - 1)}
        >
          이동
        </button>
      </div>
      <div className={cx("navButtons")}>
        <button
          className={cx("navButton", "prev")}
          onClick={onChangePage(pageStatus - 1)}
        >
          이전
        </button>
        <button
          className={cx("navButton", "next")}
          onClick={onChangePage(pageStatus + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
};
export default PageNavigator;
