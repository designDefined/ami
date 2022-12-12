import { IPage } from "../../../../../types/old/base";
import styles from "./PageWidget.module.scss";
import classNames from "classnames/bind";
import WidgetWrapper from "../Widget";
import {
  onChangePageNumberAttribute,
  onChangePageStringAttribute,
  onConnectPage,
  onPressListedPage,
} from "../../../handlers/weaveEventHandler";
import { useSelection } from "../../../../../store/selection";
import { useProject } from "../../../../../store/project";

const cx = classNames.bind(styles);

interface PropPage {
  selectedPage: IPage | false;
}
interface PropPages {
  pages: IPage[];
}

interface PropList {
  pages: IPage[];
  selectedPage: IPage | false;
}

export const PageConnection = ({
  selectedPage,
  modifiable,
}: {
  selectedPage: IPage | false;
  modifiable: boolean;
}) => {
  const pages = useProject((state) => state.pages);
  if (!selectedPage) {
    return (
      <WidgetWrapper name={"페이지를 선택하세요"}>
        <span />
      </WidgetWrapper>
    );
  }
  const connected = selectedPage.connectedTo;
  if (!modifiable) {
    return (
      <>
        {connected
          .map((connection) => pages.find((page) => page.id === connection))
          .map((page) =>
            page ? (
              <option key={page.id} value={page.id}>
                {page.pageName}
              </option>
            ) : null,
          )}
      </>
    );
  }
  return (
    <WidgetWrapper name="연결하기">
      <div className={cx("connections")}>
        {pages
          .filter((page) => page.id !== selectedPage.id)
          .map((page) => (
            <div
              key={page.id}
              className={cx("name", {
                connected: connected.includes(page.id),
              })}
              onClick={onConnectPage(
                selectedPage,
                page,
                !connected.includes(page.id),
              )}
            >
              {page.pageName}
            </div>
          ))}
      </div>
    </WidgetWrapper>
  );
};

export const PageInfo = ({
  selectedPage: page,
}: {
  selectedPage: IPage | false;
}) => {
  if (!page) {
    return (
      <WidgetWrapper name={"페이지를 선택하세요"}>
        <span />
      </WidgetWrapper>
    );
  }
  return (
    <WidgetWrapper name="페이지 정보">
      <div className={cx("PageInfo")}>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>기본 정보</div>
          <div className={cx("attribute")}>
            <div className={cx("attributeLabel")}>이름:</div>
            <input
              className={cx("attributeInput", "long")}
              type="text"
              value={page.pageName}
              onChange={onChangePageStringAttribute("pageName", page)}
            />
          </div>
          <div className={cx("sectionHorizontal")}>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>높이:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={page.offsetHeight}
                onChange={onChangePageNumberAttribute("offsetHeight", page)}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>배경:</div>
              <input
                className={cx("attributeInput")}
                type="color"
                value={page.backgroundColor}
                onChange={onChangePageStringAttribute("backgroundColor", page)}
              />
            </div>
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
};
const cutName = (name: string): string =>
  name.length > 8 ? name.slice(0, 8) + "..." : name;
const PageList = ({ pages, selectedPage }: PropList) => {
  const selectPage = useSelection((state) => state.selectPage);
  const deselect = useSelection((state) => state.deselect);

  return (
    <WidgetWrapper name="모든 페이지">
      <ol className={cx("PageList")}>
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
      </ol>
    </WidgetWrapper>
  );
};

const PageWidget = ({ pages }: PropPages) => {
  const { type, data: page } = useSelection((state) => state.current);
  return (
    <>
      <PageInfo selectedPage={type === "page" ? page : false} />
      <PageConnection
        selectedPage={type === "page" ? page : false}
        modifiable={true}
      />
      <PageList pages={pages} selectedPage={type === "page" ? page : false} />
    </>
  );
};

export default PageWidget;
