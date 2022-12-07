import { IPage } from "../../../../types/base";
import styles from "./Page.module.scss";
import classNames from "classnames/bind";
import Atom from "../Atom/Atom";
import { checkSelectedAtom, useSelection } from "../../../../store/selection";

const cx = classNames.bind(styles);

interface Props {
  page: IPage;
}

const Page = ({ page }: Props) => {
  const current = useSelection((state) => state.current);
  return (
    <div className={cx("Page")}>
      {page.atoms
        .filter((atom) => atom.isPlaced === "placed")
        .map((atom) => (
          <Atom
            key={atom.id}
            atom={atom}
            isSelected={checkSelectedAtom(current, atom)}
          />
        ))}
    </div>
  );
};

export default Page;
