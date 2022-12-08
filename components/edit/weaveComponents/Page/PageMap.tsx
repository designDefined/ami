import { IPage } from "../../../../types/base";
import styles from "./Pagemap.module.scss";
import classNames from "classnames/bind";
import { checkSelectedPage } from "../../../../store/selection";
import { CSSProperties, useMemo } from "react";
import createStyle from "../../../../functions/create/createStyle";
import { onPressPlacedPage } from "../../handlers/weaveEventHandler";
import { includes } from "lodash";

const cx = classNames.bind(styles);

interface Props {
  pages: IPage[];
}

const PageSymbol = ({
  page,
  isSelected,
}: {
  page: IPage;
  isSelected: boolean;
}) => {
  const { pageName } = page;
  const pageSymbolStyle = useMemo(
    (): CSSProperties => createStyle.pageSymbol(page),
    [page],
  );
  return (
    <div
      className={cx("PageSymbol", { isSelected })}
      style={pageSymbolStyle}
      onMouseDown={onPressPlacedPage(page)}
    >
      {pageName}
    </div>
  );
};

const edgeStyle = (page1: IPage, page2: IPage) => {
  const [{ placedX: x1, placedY: y1 }, { placedX: x2, placedY: y2 }] = [
    page1,
    page2,
  ];
  return (x1 - x2) * (y1 - y2) >= 0
    ? {
        left: Math.min(x1, x2) + 25,
        top: Math.min(y1, y2) + 25,
        width: Math.abs(x1 - x2),
        height: Math.abs(y1 - y2),
        background:
          "linear-gradient( to top right, #fff calc(50% - 3px), #b0b0b0, #fff calc(50% + 3px)",
      }
    : {
        left: Math.min(x1, x2) + 25,
        top: Math.min(y1, y2) + 25,
        width: Math.abs(x1 - x2),
        height: Math.abs(y1 - y2),
        background:
          "linear-gradient( to top left, #fff calc(50% - 3px), #b0b0b0, #fff calc(50% + 3px)",
      };
};

const PageMap = ({ pages }: Props) => {
  return (
    <div className={cx("PageMap")}>
      {pages
        .filter((page) => page.isPlaced === "placed")
        .map((source) =>
          source.connectedTo
            .map((connection) =>
              pages.find(
                (page) => connection.includes(page.id) && page.isPlaced,
              ),
            )
            .map((page) =>
              page ? (
                <div className={cx("Edge")} style={edgeStyle(source, page)} />
              ) : null,
            ),
        )}
      {pages
        .filter((page) => page.isPlaced === "placed")
        .map((page) => (
          <PageSymbol
            key={page.id}
            page={page}
            isSelected={checkSelectedPage(page)}
          />
        ))}
    </div>
  );
};

export default PageMap;
