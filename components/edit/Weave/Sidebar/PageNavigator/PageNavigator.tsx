import classNames from "classnames/bind";
import styles from "./PageNavigator.module.scss";
import { useProject } from "../../../../../store/project";
import WidgetWrapper from "../Widget";
import {
  onChangeCurrentPageId,
  onChangeCurrentPageNumber,
} from "../../functions/changePageStatus";

const cx = classNames.bind(styles);

const PageNavigator = () => {
  const pages = useProject((state) => state.pages);
  const pageStatus = useProject((state) => state.pageStatus);

  return (
    <WidgetWrapper name="페이지 이동">
      <div className={cx("PageNavigator")}>
        <div className={cx("pageNumber")}>
          페이지:
          <button
            className={cx("pageButton", "prev")}
            onClick={() => onChangeCurrentPageNumber(pageStatus - 1)}
          >
            이전
          </button>
          <span>{pageStatus + 1}</span>
          <span>/</span> <span>{pages.length}</span>
          <button
            className={cx("pageButton", "next")}
            onClick={() => onChangeCurrentPageNumber(pageStatus + 1)}
          >
            다음
          </button>
        </div>
        <select
          className={cx("pageSelect")}
          value={pageStatus < 0 ? "home" : pages[pageStatus].id}
          onChange={(e) => onChangeCurrentPageId(e.target.value)}
        >
          <option value={"home"}>전체 페이지</option>
          {pages.map(({ id, pageName }) => (
            <option key={id} value={id}>
              {pageName}
            </option>
          ))}
          <option className={cx("pageOption")}>가나다</option>
        </select>
      </div>
    </WidgetWrapper>
  );
};
export default PageNavigator;
