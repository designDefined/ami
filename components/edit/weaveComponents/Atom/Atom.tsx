import styles from "./Atom.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../types/base";
import { onPressPlacedAtom } from "../../handlers/weaveEventHandler";
import { CSSProperties, useMemo } from "react";
import createStyle from "../../../../functions/create/createStyle";

interface Props {
  atom: IAtom;
  isSelected: boolean;
}
const cx = classNames.bind(styles);

const Atom = ({ atom, isSelected }: Props) => {
  const { content } = atom;
  const atomStyle = useMemo(
    (): CSSProperties => createStyle.atom(atom),
    [atom],
  );
  return (
    <div
      className={cx("Atom", { isSelected })}
      style={atomStyle}
      onMouseDown={onPressPlacedAtom(atom)}
    >
      {content}
    </div>
  );
};
export default Atom;
