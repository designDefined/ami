import styles from "./Page.module.scss";
import classNames from "classnames/bind";
import createStyle from "../../../functions/create/createStyle";
import Atom from "../Atom/Atom";
import { CSSProperties, useMemo } from "react";
import { IPage } from "../../../types/page";
import buildPageStyle from "../../../functions/create/buildPageStyle";

const cx = classNames.bind(styles);
interface Props {
  page: IPage;
}

const Page = ({ page }: Props) => {
  return (
    <div className={cx("Page")} style={buildPageStyle(page)}>
      {page.atoms
        .filter((atom) => atom.isPlaced === "placed")
        .map((atom) => (
          <Atom key={atom.id} atom={atom} />
        ))}
    </div>
  );
};

export default Page;
