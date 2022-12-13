import { IPage } from "../../../../../types/page";
import { buildPageSymbolStyle } from "../../../../../functions/create/buildPageStyle";
import styles from "../../PageSymbol/PageSymbol.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface Props {
  x: number;
  y: number;
  page: IPage;
}

const PageSymbolToDrag = ({ x, y, page }: Props) => {
  const { pageName } = page;
  return (
    <div
      className={cx("PageSymbol", "drag")}
      style={buildPageSymbolStyle(page, { x, y })}
    >
      {pageName}
    </div>
  );
};

export default PageSymbolToDrag;
