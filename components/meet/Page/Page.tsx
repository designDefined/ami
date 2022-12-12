import { IPage } from "../../../types/old/base";
import styles from "./Page.module.scss";
import classNames from "classnames/bind";
import createStyle from "../../../functions/create/createStyle";
import Atom from "../Atom/Atom";
import { CSSProperties, useMemo } from "react";

const cx = classNames.bind(styles);
interface Props {
  page: IPage;
}

const Page = ({ page }: Props) => {
  const pageStyle = useMemo(
    (): CSSProperties => createStyle.page(page),
    [page],
  );
  return (
    <div className={cx("Page")} style={pageStyle}>
      {page.atoms
        .filter((atom) => atom.isPlaced === "placed")
        .map((atom) => (
          <Atom key={atom.id} atom={atom} />
        ))}
    </div>
  );
};

export default Page;
