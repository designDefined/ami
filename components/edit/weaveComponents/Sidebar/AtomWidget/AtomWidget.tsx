import { IAtom, IMarkDownType, IPage } from "../../../../../types/base";
import styles from "./AtomWidget.module.scss";
import classNames from "classnames/bind";
import { PageConnection, PageInfo } from "../PageWidget/PageWidget";
import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";
import {
  getClickInteraction,
  getClickInteractionValue,
  onAddImageAtom,
  onChangeAtomNumberAttribute,
  onChangeAtomStringAttribute,
  onChangeClickInteraction,
  onPressListedAtom,
  updateAtomInfo,
} from "../../../handlers/weaveEventHandler";
import { useText } from "../../../../../store/text";
import { useEffect } from "react";
import { imageSampleList } from "../../../../../public/assets/images/images";
const cx = classNames.bind(styles);

interface PropList {
  page: IPage;
  selectedAtom: IAtom | false;
}
interface PropInfo {
  selectedAtom: IAtom | false;
  page: IPage;
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

const AtomInfo = ({ selectedAtom: atom, page }: PropInfo) => {
  if (!atom) {
    return (
      <WidgetWrapper name={"요소를 선택하세요"}>
        <span />
      </WidgetWrapper>
    );
  }
  if (atom.type === "image") {
    return (
      <WidgetWrapper name={"상세"}>
        <div className={cx("AtomInfo")}>
          <div className={cx("section")}>
            <div className={cx("sectionLabel")}>이미지</div>
            <select
              className={cx("attributeSelect")}
              value={atom.content}
              onChange={onChangeAtomStringAttribute("content", atom)}
            >
              <option value="no image">없음</option>
              {imageSampleList.map((imageName) => (
                <option key={imageName} value={imageName}>
                  {imageName}
                </option>
              ))}
            </select>
          </div>
          <div className={cx("section")}>
            <div className={cx("sectionLabel")}>위치</div>
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
        </div>
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
          <div className={cx("sectionLabel")}>위치</div>
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
                <option value="center">중앙</option>
                <option value="left">좌측</option>
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
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>클릭</div>

          <div className={cx("attribute")}>
            <div className={cx("attributeLabel")}>이동:</div>
            <select
              className={cx("attributeSelect")}
              value={getClickInteractionValue(atom.interactions)}
              onChange={onChangeClickInteraction(atom, false)}
            >
              <option value="clear">없음</option>
              <PageConnection selectedPage={page} modifiable={false} />
              <option value="external">외부 링크</option>
            </select>
            {getClickInteraction(atom.interactions) && (
              <input
                value={getClickInteraction(atom.interactions).to}
                onChange={onChangeClickInteraction(atom, true)}
              />
            )}
          </div>
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>스크롤</div>
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

const translateType = (type: IMarkDownType): string => {
  switch (type) {
    case "h1":
      return "제목1";
    case "h2":
      return "제목2";
    case "h3":
      return "제목3";
    case "h4":
      return "제목4";
    default:
      return "본문";
  }
};

const cutContent = (content: string): string =>
  content.length > 12 ? content.slice(0, 12) + "..." : content;

const AtomList = ({ page, selectedAtom }: PropList) => {
  const selectAtom = useSelection((state) => state.selectAtom);
  const deselect = useSelection((state) => state.deselect);

  return (
    <WidgetWrapper name="모든 요소">
      <ol className={cx("AtomList")}>
        <li className={cx("itemLabel")}>
          <span className={cx("itemSpan", "index")}>#</span>
          <span className={cx("itemSpan", "content")}>내용</span>
          <span className={cx("itemSpan", "type")}>타입</span>
        </li>
        {page.atoms.map((atom, index) => (
          <li
            key={atom.id}
            className={cx("item", {
              selected: selectedAtom && selectedAtom.id === atom.id,
              placed: atom.isPlaced !== "notPlaced",
            })}
            onClick={(e) => {
              e.preventDefault();
              if (selectedAtom && selectedAtom.id === atom.id) {
                deselect();
              } else {
                selectAtom(atom);
              }
            }}
            onMouseDown={onPressListedAtom(atom)}
          >
            <span className={cx("itemSpan", "index")}>{index + 1}</span>
            <span className={cx("itemSpan", "content")}>
              {cutContent(atom.content)}
            </span>
            <span className={cx("itemSpan", "type")}>
              {translateType(atom.markdownType)}
            </span>
          </li>
        ))}
        <div
          className={cx("itemLabel", "add")}
          onClick={onAddImageAtom(page.id)}
        >
          이미지 추가
        </div>
      </ol>
    </WidgetWrapper>
  );
};

const AtomWidget = ({ page }: PropWidget) => {
  const { type, data: atom } = useSelection((state) => state.current);
  return (
    <>
      <AtomInfo selectedAtom={type === "atom" ? atom : false} page={page} />
      <AtomList page={page} selectedAtom={type === "atom" ? atom : false} />
      <PageInfo selectedPage={page} />
    </>
  );
};

export default AtomWidget;
