import WidgetWrapper from "../Widget";
import {
  getClickInteraction,
  getClickInteractionValue,
  onAddScroll,
  onChangeAtomNumberAttribute,
  onChangeAtomStringAttribute,
  onChangeClickInteraction,
  onDeleteScroll,
  updateAtomInfo,
} from "../../../handlers/weaveEventHandler";
import { imageSampleList } from "../../../../../public/assets/images/images";

import styles from "./Info.module.scss";
import classNames from "classnames/bind";
import { IAtom } from "../../../../../types/atom";
import { IPage } from "../../../../../types/page";
import {
  AtomBackgroundInput,
  AtomBorderInput,
  AtomEffectInput,
  AtomFontInput,
  AtomInteractionInput,
  AtomPositionInput,
  AtomTextContentInput,
} from "../Inputs/AtomInput";
import { changeAtomStringAttribute } from "../../functions/changeAttribute";

const cx = classNames.bind(styles);

interface Props {
  selectedAtom: IAtom | false;
  page: IPage;
}

export const AtomInfo = ({ selectedAtom: atom, page }: Props) => {
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
        <div className={cx("info")}>
          <div className={cx("section")}>
            <div className={cx("sectionLabel")}>이미지</div>
            <select
              className={cx("attributeSelect")}
              value={atom.content}
              onChange={(e) =>
                changeAtomStringAttribute(e.target.value, "content", atom)
              }
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
            <div className={cx("sectionLabel")}>위치 / 크기</div>
            <AtomPositionInput atom={atom} />
          </div>
        </div>
      </WidgetWrapper>
    );
  }

  return (
    <WidgetWrapper name={"상세"}>
      <div className={cx("info")}>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>내용</div>
          <AtomTextContentInput atom={atom} />
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>위치 / 크기</div>
          <AtomPositionInput atom={atom} />
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>글씨</div>
          <AtomFontInput atom={atom} />
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>배경</div>
          <AtomBackgroundInput atom={atom} />
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>테두리</div>
          <AtomBorderInput atom={atom} />
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>효과</div>
          <AtomEffectInput atom={atom} />
        </div>
        <div className={cx("section")}>
          <div className={cx("sectionLabel")}>인터랙션</div>
          <AtomInteractionInput atom={atom} />
        </div>
      </div>
    </WidgetWrapper>
  );
};
