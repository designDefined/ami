import { useSelection } from "../../../../../store/selection";
import WidgetWrapper from "../Widget";

import styles from "./List.module.scss";
import classNames from "classnames/bind";
import { IAtom, IMarkdownType, markdownTypes } from "../../../../../types/atom";
import { IPage } from "../../../../../types/page";
import { onPressListedAtom } from "../../functions/cursorEvent";
import { createTextAtom } from "../../functions/createNew";

const cx = classNames.bind(styles);
interface Props {
  page: IPage;
  selectedAtom: IAtom | false;
}

const cutContent = (content: string): string =>
  content.length > 12 ? content.slice(0, 12) + "..." : content;
const translateType = (type: IMarkdownType): string => {
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

const AtomList = ({ page, selectedAtom }: Props) => {
  const selectAtom = useSelection((state) => state.selectAtom);
  const deselect = useSelection((state) => state.deselect);

  return (
    <WidgetWrapper name="모든 요소">
      <ol className={cx("list")}>
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
        <div className={cx("buttons")}>
          추가:
          {markdownTypes
            .filter((type) => !["image", "oli", "uli"].includes(type))
            .map((type) => (
              <button
                key={type}
                className={cx("add")}
                onClick={(e) => {
                  e.preventDefault();
                  if (type !== "image") {
                    createTextAtom(page.id, type, translateType(type));
                  }
                }}
              >
                {translateType(type)}
              </button>
            ))}
        </div>
      </ol>
    </WidgetWrapper>
  );
};
export default AtomList;
