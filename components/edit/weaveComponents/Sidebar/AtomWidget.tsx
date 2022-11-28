import { IAtom, IPage } from "../../../../types/base";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { PageInfo } from "./PageWidget";
import { useSelection } from "../../../../store/selection";
const cx = classNames.bind(styles);

interface PropPage {
  page: IPage;
}
const AtomInfo = () => {
  const { type, data: atom } = useSelection((state) => state.current);
  return (
    <div className={cx("AtomInfo")}>
      {type === "atom" ? <div>{atom.id}</div> : <div>선택된 Atom 없음</div>}
    </div>
  );
};

const AtomList = ({ page }: PropPage) => {
  const selectAtom = useSelection((state) => state.selectAtom);
  return (
    <ol className={cx("AtomList")}>
      <div className={cx("widgetName")}>전체 요소</div>
      {page.atoms.map((atom) => (
        <li
          key={atom.id}
          className={cx("item")}
          onClick={(e) => {
            e.preventDefault();
            selectAtom(atom);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          {atom.content}
        </li>
      ))}
    </ol>
  );
};

const AtomWidget = ({ page }: PropPage) => {
  return (
    <div className={cx("AtomWidget")}>
      <PageInfo page={page} />
      <AtomInfo />
      <AtomList page={page} />
    </div>
  );
};

export default AtomWidget;
