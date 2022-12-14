import styles from "./AtomWidget.module.scss";
import classNames from "classnames/bind";

import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";
import {
  getClickInteraction,
  getClickInteractionValue,
  onAddImageAtom,
  onAddScroll,
  onChangeAtomNumberAttribute,
  onChangeAtomStringAttribute,
  onChangeClickInteraction,
  onDeleteScroll,
  onPressListedAtom,
  updateAtomInfo,
} from "../../../handlers/weaveEventHandler";
import { useText } from "../../../../../store/text";
import { useEffect } from "react";
import { imageSampleList } from "../../../../../public/assets/images/images";
import { AtomInfo } from "../Info/AtomInfo";
import { IPage } from "../../../../../types/page";
import { IAtom } from "../../../../../types/atom";
import { IMarkDownType } from "../../../../../types/old/base";
import PageInfo from "../Info/PageInfo";
const cx = classNames.bind(styles);

interface PropList {
  page: IPage;
  selectedAtom: IAtom | false;
}
interface PropInfo {
  selectedAtom: IAtom | false;
  page: IPage;
}
interface Props {
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

const AtomWidget = ({ page }: Props) => {
  const { type, data: atom } = useSelection((state) => state.current);
  return (
    <>
      <PageInfo selectedPage={page} />
      <AtomInfo selectedAtom={type === "atom" ? atom : false} page={page} />
    </>
  );
};

export default AtomWidget;
