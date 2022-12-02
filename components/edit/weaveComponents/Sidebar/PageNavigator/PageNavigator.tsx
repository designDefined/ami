import classNames from "classnames/bind";
import styles from "./PageNavigator.module.scss";
import { IPage } from "../../../../../types/base";
import { useProject } from "../../../../../store/project";
import { useCallback, useRef, useState } from "react";
import WidgetWrapper from "../Widget";

const cx = classNames.bind(styles);

interface Props {
  pages: IPage[];
}

const PageNavigator = ({ pages }: Props) => {
  const pageStatus = useProject((state) => state.pageStatus);
  const setPageStatus = useProject((state) => state.setPageStatus);
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
    <WidgetWrapper name="페이지 이동">
      <div className={cx("PageNavigator")}>
        <div className={cx("pageNumber")}>
          페이지:
          {/*<input*/}
          {/*  className={cx("currentPage")}*/}
          {/*  value={pageInput}*/}
          {/*  onChange={(e) => {*/}
          {/*    const num = Number(e.target.value);*/}
          {/*    if (Number.isInteger(num)) setPageInput(Number(num));*/}
          {/*  }}*/}
          {/*/>*/}
          <span>{pageStatus + 1}</span>
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
    </WidgetWrapper>
  );
};
export default PageNavigator;
