import { IPage } from "../../types/old/base";
import { useProject } from "../../store/project";
import WidgetWrapper from "../../components/edit/Weave/Sidebar/Widget";
import { onConnectPage } from "../../components/edit/handlers/weaveEventHandler";

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
