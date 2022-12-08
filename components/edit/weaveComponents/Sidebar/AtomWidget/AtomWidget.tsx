import { IAtom, IPage } from "../../../../../types/base";
import styles from "./AtomWidget.module.scss";
import classNames from "classnames/bind";
import { PageInfo } from "../PageWidget/PageWidget";
import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";
import {
  onChangeAtomNumberAttribute,
  onChangeAtomStringAttribute,
  onPressListedAtom,
} from "../../../handlers/weaveEventHandler";
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
  if (!atom) {
    return (
      <WidgetWrapper name={"요소를 선택하세요"}>
        <span />
      </WidgetWrapper>
    );
  }

  return (
    <WidgetWrapper name={"상세"}>
      <div className={cx("AtomInfo")}>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>내용</div>
          <textarea></textarea>
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>크기</div>
          <div className={cx("sectionHorizontal")}>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>X:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={atom.placedX}
                onChange={onChangeAtomNumberAttribute("placedX", atom)}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>Y:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={atom.placedY}
                onChange={onChangeAtomNumberAttribute("placedY", atom)}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>넓이:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={atom.offsetWidth}
                onChange={onChangeAtomNumberAttribute("offsetWidth", atom)}
              />
            </div>
          </div>
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>서체</div>
          <div className={cx("sectionHorizontal")}>
            <select></select>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>크기:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={atom.fontSize}
                onChange={onChangeAtomNumberAttribute("fontSize", atom)}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>색상:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={atom.fontColor}
                onChange={onChangeAtomStringAttribute("fontColor", atom)}
              />
            </div>
          </div>
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>배경</div>
          <div className={cx("sectionHorizontal")}>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>여백:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={atom.offsetWidth}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>색상:</div>
              <input
                className={cx("attributeInput")}
                type="text"
                value={atom.offsetWidth}
              />
            </div>
          </div>
        </div>
      </div>
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
      <PageInfo page={page} />
      <AtomInfo selectedAtom={type == "atom" ? atom : false} />
      <AtomList page={page} selectedAtom={type == "atom" ? atom : false} />
    </>
  );
};

export default AtomWidget;
