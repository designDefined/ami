import { IAtom, IPage } from "../../../../../types/base";
import styles from "./AtomWidget.module.scss";
import classNames from "classnames/bind";
import { PageInfo } from "../PageWidget/PageWidget";
import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";
import { useCursor } from "../../../../../store/cursor";
import { onPressAtom } from "../../../handlers/weaveEventHandler";
const cx = classNames.bind(styles);

interface PropPage {
  page: IPage;
  selectedAtom: IAtom | false;
}
interface PropAtom {
  selectedAtom: IAtom | false;
}
const AtomInfo = ({ selectedAtom: atom }: PropAtom) => {
  return (
    <WidgetWrapper name={"요소 정보"}>
      {atom ? <div>{atom.id}</div> : <div>선택된 Atom 없음</div>}
    </WidgetWrapper>
  );
};

const AtomList = ({ page, selectedAtom }: PropPage) => {
  const selectAtom = useSelection((state) => state.selectAtom);
  const startDragAtom = useCursor((state) => state.startDragAtom);
  return (
    <WidgetWrapper name="요소 목록">
      <ol className={cx("AtomList")}>
        {page.atoms.map((atom, index) => (
          <li
            key={atom.id}
            className={cx("item", {
              selected: selectedAtom && selectedAtom.id === atom.id,
            })}
            onClick={(e) => {
              e.preventDefault();
              selectAtom(atom);
            }}
            onMouseDown={onPressAtom(atom)}
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
      <AtomInfo selectedAtom={type == "atom" ? atom : false} />
      <AtomList page={page} selectedAtom={type == "atom" ? atom : false} />
    </>
  );
};

export default AtomWidget;
