import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";

import { IPage } from "../../../../../types/page";
import { useProject } from "../../../../../store/project";
import styles from "./List.module.scss";
import classNames from "classnames/bind";
import { onPressListedPage } from "../../functions/cursorEvent";
import { createPage } from "../../functions/createNew";

const cx = classNames.bind(styles);
interface Props {
  selectedPage: IPage | false;
}

const cutName = (name: string): string =>
  name.length > 8 ? name.slice(0, 8) + "..." : name;

export const PageList = ({ selectedPage }: Props) => {
  const pages = useProject((state) => state.pages);
  const selectPage = useSelection((state) => state.selectPage);
  const deselect = useSelection((state) => state.deselect);

  return (
    <WidgetWrapper name="모든 페이지">
      <ol className={cx("list")}>
        <li className={cx("itemLabel")}>
          <span className={cx("itemSpan", "index")}>#</span>
          <span className={cx("itemSpan", "content")}>이름</span>
        </li>
        {pages.map((page, index) => (
          <li
            key={page.id}
            className={cx("item", {
              selected: selectedPage && selectedPage.id === page.id,
              placed: page.isPlaced !== "notPlaced",
            })}
            onClick={(e) => {
              e.preventDefault();
              if (selectedPage && selectedPage.id === page.id) {
                deselect();
              } else {
                selectPage(page);
              }
            }}
            onMouseDown={onPressListedPage(page)}
          >
            <span className={cx("itemSpan", "index")}>{index + 1}</span>
            <span className={cx("itemSpan", "content")}>
              {cutName(page.pageName)}
            </span>
          </li>
        ))}
        <div className={cx("buttons")}>
          <button
            className={cx("add", "page")}
            onClick={(e) => {
              e.preventDefault();
              createPage(`페이지 ${pages.length + 1}`);
            }}
          >
            페이지 추가
          </button>
        </div>
      </ol>
    </WidgetWrapper>
  );
};
