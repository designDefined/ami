import { IAtom } from "../../../../types/atom";
import classNames from "classnames/bind";
import buildAtomStyle from "../../../../functions/create/buildAtomStyle";
import style from "./Atom.module.scss";
import { onDoubleClickAtom, onPressPlacedAtom } from "../functions/cursorEvent";

const cx = classNames.bind(style);

interface Props {
  atom: IAtom;
  isSelected: boolean;
  isDragging: boolean;
}

const Atom = ({ atom, isSelected, isDragging }: Props) => {
  const { type, content } = atom;
  return (
    <div
      className={cx("Atom", "edit", { noEvent: isDragging })}
      style={buildAtomStyle(atom, false)}
      onClick={() => {
        if (isSelected) onDoubleClickAtom();
      }}
      onMouseDown={onPressPlacedAtom(atom)}
    >
      {type === "text" ? content : "image"}
      <div className={cx("cursorState", { isSelected })} />
    </div>
  );
};

export default Atom;
