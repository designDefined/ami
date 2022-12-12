import styles from "./Page.module.scss";
import classNames from "classnames/bind";
import { checkSelectedAtom, useSelection } from "../../../../store/selection";
import { onDrag, onRelease } from "../../handlers/weaveEventHandler";
import { MainDragArea } from "../DragArea/DragArea";
import { IPage } from "../../../../types/page";
import buildPageStyle from "../../../../functions/create/buildPageStyle";
import Atom from "../Atom/Atom";

const cx = classNames.bind(styles);

interface Props {
  page: IPage;
}

const Page = ({ page }: Props) => {
  const current = useSelection((state) => state.current);
  return (
    <div
      className={cx("Page")}
      style={buildPageStyle(page)}
      onMouseMove={onDrag()}
      onMouseUp={onRelease()}
    >
      {page.atoms
        .filter((atom) => atom.isPlaced === "placed")
        .map((atom) => (
          <Atom
            key={atom.id}
            atom={atom}
            isSelected={checkSelectedAtom(current, atom)}
          />
        ))}
      <MainDragArea />
    </div>
  );
};

export default Page;
