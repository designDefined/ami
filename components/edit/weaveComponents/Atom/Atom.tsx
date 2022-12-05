import styles from "./Atom.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../types/base";
import { onPressPlacedAtom } from "../../handlers/weaveEventHandler";

interface Props {
  atom: IAtom;
}
const cx = classNames.bind(styles);

const Atom = ({ atom }: Props) => {
  const { content, offsetWidth, placedX, placedY } = atom;
  return (
    <div
      className={cx("Atom")}
      style={{ width: offsetWidth, top: `${placedY}px`, left: `${placedX}px` }}
      onMouseDown={onPressPlacedAtom(atom)}
    >
      {content}
    </div>
  );
};
export default Atom;
