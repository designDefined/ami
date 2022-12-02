import { IPage } from "../../../../../types/base";
import styles from "./AtomWidget.module.scss";
import classNames from "classnames/bind";
import { PageInfo } from "../PageWidget/PageWidget";
import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";
const cx = classNames.bind(styles);

interface PropPage {
  page: IPage;
}
const AtomInfo = () => {
  const { type, data: atom } = useSelection((state) => state.current);
  return (
    <WidgetWrapper name={"요소 정보"}>
      {type === "atom" ? <div>{atom.id}</div> : <div>선택된 Atom 없음</div>}
    </WidgetWrapper>
  );
};

const AtomList = ({ page }: PropPage) => {
  const selectAtom = useSelection((state) => state.selectAtom);
  return (
    <WidgetWrapper name="요소 목록">
      <ol className={cx("AtomList")}>
        {page.atoms.map((atom, index) => (
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
            <span className={cx("index")}>{index + 1}</span>
            <span>{atom.content}</span>
          </li>
        ))}
      </ol>
    </WidgetWrapper>
  );
};

const AtomWidget = ({ page }: PropPage) => {
  const { type, data: atom } = useSelection((state) => state.current);
  return (
    <>
      <PageInfo page={page} />
      <AtomInfo />
      <AtomList page={page} />
    </>
  );
};

export default AtomWidget;
