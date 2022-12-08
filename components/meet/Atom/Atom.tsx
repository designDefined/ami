import { IAtom } from "../../../types/base";
import styles from "./Atom.module.scss";
import classNames from "classnames/bind";
import { CSSProperties, useMemo } from "react";
import createStyle from "../../../functions/create/createStyle";

const cx = classNames.bind(styles);

interface Props {
  atom: IAtom;
}
const Atom = ({ atom }: Props) => {
  const atomStyle = useMemo(
    (): CSSProperties => createStyle.atom(atom),
    [atom],
  );
  return (
    <div className={cx("Atom")} style={atomStyle}>
      {atom.content}
    </div>
  );
};

export default Atom;
