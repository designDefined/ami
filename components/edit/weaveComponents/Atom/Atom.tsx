import styles from "./Atom.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../types/base";

interface Props {
  atom: IAtom;
}
const cx = classNames.bind(styles);

const Atom = ({ atom }: Props) => {
  return <div className={cx("Atom")}></div>;
};
export default Atom;
