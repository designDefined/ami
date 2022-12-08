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
  updateAtomInfo,
} from "../../../handlers/weaveEventHandler";
import { useText } from "../../../../../store/text";
import { useEffect } from "react";
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

const AtomContent = ({ selectedAtom: atom }: { selectedAtom: IAtom }) => {
  const { input, setInput } = useText((state) => state);
  useEffect(() => {
    setInput(atom.content);
  }, [atom]);

  return (
    <textarea
      className={cx("inputContent")}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          updateAtomInfo({ ...atom, content: input });
        }
      }}
      onBlur={() => {
        updateAtomInfo({ ...atom, content: input });
      }}
    />
  );
};

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
          <AtomContent selectedAtom={atom} />
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
          <div className={cx("sectionLabel")}>글자</div>
          <div className={cx("sectionHorizontal")}>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>크기:</div>
              <input
                className={cx("attributeInput", "small")}
                type="text"
                value={atom.fontSize}
                onChange={onChangeAtomNumberAttribute("fontSize", atom)}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>두께:</div>
              <input
                className={cx("attributeInput", "small")}
                type="text"
                value={atom.fontWeight}
                onChange={onChangeAtomNumberAttribute("fontWeight", atom)}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>색상:</div>
              <input
                className={cx("attributeInput")}
                type="color"
                value={atom.fontColor}
                onChange={onChangeAtomStringAttribute("fontColor", atom)}
              />
            </div>
          </div>
          <div className={cx("sectionHorizontal")}>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>폰트:</div>
              <select className={cx("attributeSelect")}>
                <option>기본</option>
              </select>
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>정렬:</div>
              <select
                className={cx("attributeSelect")}
                value={atom.textAlign}
                onChange={onChangeAtomStringAttribute("textAlign", atom)}
              >
                <option value="justify">양쪽</option>
                <option value="left">좌측</option>
                <option value="center">중앙</option>
                <option value="right">우측</option>
              </select>
            </div>
          </div>
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>배경</div>
          <div className={cx("sectionHorizontal")}>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>여백:</div>
              <input
                className={cx("attributeInput", "small")}
                type="text"
                value={atom.offsetPadding}
                onChange={onChangeAtomNumberAttribute("offsetPadding", atom)}
              />
            </div>
            <div className={cx("attribute")}>
              <div className={cx("attributeLabel")}>색상:</div>
              <input
                className={cx("attributeInput")}
                type="color"
                value={atom.backgroundColor}
                onChange={onChangeAtomStringAttribute("backgroundColor", atom)}
              />
              <button
                className={cx("attributeButton")}
                onClick={() =>
                  updateAtomInfo({ ...atom, backgroundColor: "transparent" })
                }
              >
                투명
              </button>
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
      <AtomInfo selectedAtom={type == "atom" ? atom : false} />
      <AtomList page={page} selectedAtom={type == "atom" ? atom : false} />
      <PageInfo page={page} />
    </>
  );
};

export default AtomWidget;
