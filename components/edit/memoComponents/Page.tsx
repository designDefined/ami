import { IAtom, IPage } from "../../../types/base";
import classNames from "classnames/bind";
import styles from "./MemoComponents.module.scss";
import { AtomReader, AtomWriter } from "./Atom";

interface Props {
  page: IPage;
}

const cx = classNames.bind(styles);

const selectAtom = (atom: IAtom, selected: IAtom[]) => {
  if (selected.length < 1) {
    return <AtomReader key={atom.id} atom={atom} />;
  } else if (selected.length === 1) {
    return atom === selected[0] ? (
      <AtomWriter key={atom.id} />
    ) : (
      <AtomReader key={atom.id} atom={atom} />
    );
  } else {
    return <AtomReader key={atom.id} atom={atom} />;
  }
};

const Page = ({ page }: Props) => {
  const { pageName, atoms } = page;
  // const selectedAtom = useSelectedAtomStore((state) => state.source);
  return (
    <div className={cx("Page")}>
      <label className={cx("name")}>{pageName}</label>
      <ul className={cx("list")}>
        {atoms.map((atom) => selectAtom(atom, []))}
      </ul>
    </div>
  );
};

export default Page;
