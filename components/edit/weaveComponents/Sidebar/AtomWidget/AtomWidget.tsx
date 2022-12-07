import { IAtom, IPage } from "../../../../../types/base";
import styles from "./AtomWidget.module.scss";
import classNames from "classnames/bind";
import { PageInfo } from "../PageWidget/PageWidget";
import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";
import { onPressListedAtom } from "../../../handlers/weaveEventHandler";
const cx = classNames.bind(styles);

interface PropList {
  page: IPage;
  selectedAtom: IAtom | false;
}
interface PropInfo {
  selectedAtom: IAtom | false;
}
interface PropWidget {
  page: IPage;
}

const AtomInfo = ({ selectedAtom: atom }: PropInfo) => {
  return (
    <WidgetWrapper name={"상세"}>
      {atom ? <div>{atom.placedX}</div> : <div>요소를 선택하세요</div>}
    </WidgetWrapper>
  );
};

const AtomList = ({ page, selectedAtom }: PropList) => {
  const selectAtom = useSelection((state) => state.selectAtom);
  return (
    <WidgetWrapper name="모든 요소">
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
            onMouseDown={onPressListedAtom(atom)}
          >
            <span className={cx("index")}>{index + 1}</span>
            <span>{atom.content}</span>
          </li>
        ))}
      </ol>
    </WidgetWrapper>
  );
};

const AtomWidget = ({ page }: PropWidget) => {
  const { type, data: atom } = useSelection((state) => state.current);
  return (
    <>
      <AtomInfo selectedAtom={type == "atom" ? atom : false} />
      <AtomList page={page} selectedAtom={type == "atom" ? atom : false} />
      <PageInfo page={page} />
    </>
  );
};

export default AtomWidget;
