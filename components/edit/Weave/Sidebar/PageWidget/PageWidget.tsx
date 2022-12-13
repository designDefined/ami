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
import PageInfo from "../Info/PageInfo";
import { PageList } from "../List/PageList";

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

const PageWidget = () => {
  const { type, data: page } = useSelection((state) => state.current);
  return (
    <>
      <PageInfo selectedPage={type === "page" ? page : false} />
      {/*<PageConnection*/}
      {/*  selectedPage={type === "page" ? page : false}*/}
      {/*  modifiable={true}*/}
      {/*/>*/}
      {<PageList selectedPage={type === "page" ? page : false} />}
    </>
  );
};

export default PageWidget;
