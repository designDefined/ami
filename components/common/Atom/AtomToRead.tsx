import { IAtom } from "../../../types/atom";
import classNames from "classnames/bind";
import buildAtomStyle from "../../../functions/create/buildAtomStyle";
import style from "../../edit/Weave/Atom/Atom.module.scss";

const cx = classNames.bind(style);

interface Props {
  atom: IAtom;
}

const AtomToRead = ({ atom }: Props) => {
  const { type, content } = atom;
  return (
    <div className={cx("Atom", "edit")} style={buildAtomStyle(atom, false)}>
      {type === "text" ? content : "image"}
    </div>
  );
};

export default AtomToRead;
