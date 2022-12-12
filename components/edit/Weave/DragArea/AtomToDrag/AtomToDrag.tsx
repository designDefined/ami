import { IAtom } from "../../../../../types/atom";
import classNames from "classnames/bind";
import buildAtomStyle from "../../../../../functions/create/buildAtomStyle";
import style from "../../Atom/Atom.module.scss";

const cx = classNames.bind(style);

interface Props {
  atom: IAtom;
  x: number;
  y: number;
}

const AtomToDrag = ({ atom, x, y }: Props) => {
  const { type, content } = atom;
  return (
    <div className={cx("Atom", "drag")} style={buildAtomStyle(atom, { x, y })}>
      {type === "text" ? content : "image"}
      <div className={cx("cursorState")} />
    </div>
  );
};

export default AtomToDrag;
