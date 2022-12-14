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
  AtomFontInput,
  AtomPositionInput,
  AtomTextContentInput,
} from "../Inputs/AtomInput";

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
                <div className={cx("attributeLabel")}>효과:</div>
                {atom.interactions.filter(
                  (item) => item.interactionType === "scroll",
                ).length > 0 ? (
                  <button
                    className={cx("attributeButton", "selected")}
                    onClick={onDeleteScroll(atom)}
                  >
                    페이드 인 제거
                  </button>
                ) : (
                  <button
                    className={cx("attributeButton")}
                    onClick={onAddScroll(atom)}
                  >
                    페이드 인
                  </button>
                )}
              </div>
            </div>
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
        </div>

        {/*
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
              <div className={cx("attributeLabel")}>효과:</div>
              {atom.interactions.filter(
                (item) => item.interactionType === "scroll",
              ).length > 0 ? (
                <button
                  className={cx("attributeButton", "selected")}
                  onClick={onDeleteScroll(atom)}
                >
                  페이드 인 제거
                </button>
              ) : (
                <button
                  className={cx("attributeButton")}
                  onClick={onAddScroll(atom)}
                >
                  페이드 인
                </button>
              )}
            </div>
          </div>
        </div>

          */}
      </div>
    </WidgetWrapper>
  );
};
