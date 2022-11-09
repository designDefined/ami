import { IAtom, IPage } from "../../../types/base";
import classNames from "classnames/bind";
import styles from "./MemoComponents.module.scss";
import { useSelectedAtomStore } from "../../../store/api/selectedAtom";
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
  const { page_name, atoms } = page;
  const selectedAtom = useSelectedAtomStore((state) => state.source);
  return (
    <div className={cx("Page")}>
      <label className={cx("name")}>{page_name}</label>
      <ul className={cx("list")}>
        {atoms.map((atom) => selectAtom(atom, selectedAtom))}
      </ul>
    </div>
  );
};

export default Page;
