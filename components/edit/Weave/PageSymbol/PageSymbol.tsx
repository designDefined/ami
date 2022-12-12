import { IPage } from "../../../../types/page";
import { buildPageSymbolStyle } from "../../../../functions/create/buildPageStyle";
import styles from "./PageSymbol.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface Props {
  page: IPage;
}

const PageSymbolToDrag = ({ page }: Props) => {
  const { pageName } = page;
  return (
    <div className={cx("PageSymbol")} style={buildPageSymbolStyle(page, false)}>
      {pageName}
    </div>
  );
};

export default PageSymbolToDrag;
