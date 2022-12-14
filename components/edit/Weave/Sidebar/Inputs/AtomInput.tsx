import { useText } from "../../../../../store/text";

import styles from "./Input.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import {
  IImageAtom,
  ITextAtom,
  textAlignsWithLabels,
} from "../../../../../types/atom";
import {
  changeAtomExtension,
  changeAtomNumberAttribute,
  changeAtomStringAttribute,
  changeTextAtomNumberAttribute,
  changeTextAtomStringAttribute,
  clearLink,
} from "../../functions/changeAttribute";
import {
  clickInteractions,
  fadeEffects,
  shadowEffects,
  slideEffects,
} from "../../../../../types/atomExtension";
import { useProject } from "../../../../../store/project";
import { hasEffect } from "../../../../meet/functions/parseExtension";

const cx = classNames.bind(styles);

interface ImageProps {
  atom: IImageAtom;
}
interface TextProps {
  atom: ITextAtom;
}

export const AtomImageContentInput = ({ atom }: ImageProps) => {};

export const AtomTextContentInput = ({ atom }: TextProps) => {
  const { input, setInput } = useText((state) => state);
  useEffect(() => {
    setInput(atom.content);
  }, [atom]);

  return (
    <textarea
      className={cx("textarea")}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          changeAtomStringAttribute(input, "content", atom);
        }
      }}
      onBlur={(e) => changeAtomStringAttribute(input, "content", atom)}
    />
  );
};

export const AtomPositionInput = ({ atom }: TextProps | ImageProps) => {
  return (
    <>
      <div className={cx("horizon")}>
        <span className={cx("miniSection")}>
          X:
          <input
            className={cx("input")}
            type="number"
            value={atom.placedX}
            onChange={(e) => {
              changeAtomNumberAttribute(e.target.value, "placedX", atom);
            }}
          />
        </span>
        <span>
          Y:
          <input
            className={cx("input")}
            type="number"
            value={atom.placedY}
            onChange={(e) => {
              changeAtomNumberAttribute(e.target.value, "placedY", atom);
            }}
          />
        </span>
      </div>
      <div className={cx("horizon")}>
        넓이:
        <input
          type="range"
          className={cx("range")}
          min={1}
          max={1920}
          value={atom.offsetWidth}
          onChange={(e) =>
            changeAtomNumberAttribute(e.target.value, "offsetWidth", atom)
          }
        />
        <input
          className={cx("input")}
          type="number"
          value={atom.offsetWidth}
          onChange={(e) =>
            changeAtomNumberAttribute(e.target.value, "offsetWidth", atom)
          }
        />
      </div>
      <div className={cx("horizon")}>
        깊이:
        <input
          type="range"
          className={cx("range")}
          min={1}
          max={9}
          value={atom.layer}
          onChange={(e) =>
            changeAtomNumberAttribute(e.target.value, "layer", atom)
          }
        />
        <input
          className={cx("input")}
          type="number"
          value={atom.layer}
          onChange={(e) =>
            changeAtomNumberAttribute(e.target.value, "layer", atom)
          }
        />
      </div>
    </>
  );
};

export const AtomFontInput = ({ atom }: TextProps) => {
  return (
    <>
      <div className={cx("horizon")}>
        폰트:
        <select className={cx("select")}>
          <option>프리텐다드</option>
        </select>
        정렬:
        <select
          className={cx("select")}
          value={atom.textAlign}
          onChange={(e) => {
            changeTextAtomStringAttribute(e.target.value, "textAlign", atom);
          }}
        >
          {textAlignsWithLabels.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={cx("horizon")}>
        크기:
        <input
          type="range"
          className={cx("range")}
          min={1}
          max={160}
          value={atom.fontSize}
          onChange={(e) =>
            changeTextAtomNumberAttribute(e.target.value, "fontSize", atom)
          }
        />
        <input
          className={cx("input")}
          type="number"
          value={atom.fontSize}
          onChange={(e) =>
            changeTextAtomNumberAttribute(e.target.value, "fontSize", atom)
          }
        />
      </div>
      <div className={cx("horizon")}>
        색상:
        <input
          className={cx("color")}
          type="color"
          value={atom.fontColor}
          onChange={(e) =>
            changeTextAtomStringAttribute(e.target.value, "fontColor", atom)
          }
        />
        두께:
        <select
          className={cx("select")}
          value={cx(atom.fontWeight)}
          onChange={(e) =>
            changeTextAtomNumberAttribute(e.target.value, "fontWeight", atom)
          }
        >
          <option value={100}>매우 얇음</option>
          <option value={200}>얇음</option>
          <option value={400}>표준</option>
          <option value={700}>굵음</option>
          <option value={900}>매우 굵음</option>
        </select>
      </div>
    </>
  );
};

export const AtomBackgroundInput = ({ atom }: TextProps) => {
  return (
    <>
      <div className={cx("horizon")}>
        색상:
        <input
          className={cx("color")}
          type="color"
          value={atom.backgroundColor}
          onChange={(e) =>
            changeTextAtomStringAttribute(
              e.target.value,
              "backgroundColor",
              atom,
            )
          }
        />
        <button
          className={cx("button")}
          onClick={() =>
            changeTextAtomStringAttribute(
              "rgba(0,0,0,0)",
              "backgroundColor",
              atom,
            )
          }
        >
          투명
        </button>
      </div>
      <div className={cx("horizon")}>
        여백:
        <input
          type="range"
          className={cx("range", "small")}
          min={1}
          max={100}
          value={atom.offsetPadding}
          onChange={(e) =>
            changeAtomNumberAttribute(e.target.value, "offsetPadding", atom)
          }
        />
        <input
          className={cx("input")}
          type="number"
          value={atom.offsetPadding}
          onChange={(e) =>
            changeAtomNumberAttribute(e.target.value, "offsetPadding", atom)
          }
        />
      </div>
    </>
  );
};

export const AtomBorderInput = ({ atom }: TextProps) => {
  return (
    <>
      <div className={cx("horizon")}>
        색상:
        <input
          className={cx("color")}
          type="color"
          value={atom.borderColor}
          onChange={(e) =>
            changeTextAtomStringAttribute(e.target.value, "borderColor", atom)
          }
        />
        <button
          className={cx("button")}
          onClick={() =>
            changeTextAtomStringAttribute("rgba(0,0,0,0)", "borderColor", atom)
          }
        >
          투명
        </button>
        굵기:
        <input
          type="range"
          className={cx("range", "small")}
          min={0}
          max={80}
          value={atom.borderWidth}
          onChange={(e) =>
            changeTextAtomNumberAttribute(e.target.value, "borderWidth", atom)
          }
        />
      </div>
      <div className={cx("horizon")}>
        곡률:
        <input
          type="range"
          className={cx("range")}
          min={0}
          max={200}
          value={atom.borderRadius}
          onChange={(e) =>
            changeTextAtomNumberAttribute(e.target.value, "borderRadius", atom)
          }
        />
        <input
          className={cx("input")}
          type="number"
          value={atom.borderRadius}
          onChange={(e) =>
            changeTextAtomNumberAttribute(e.target.value, "borderRadius", atom)
          }
        />
      </div>
    </>
  );
};

export const AtomEffectInput = ({ atom }: TextProps | ImageProps) => {
  return (
    <>
      <div className={cx("horizon")}>
        페이드 IO:
        {fadeEffects.map((effect) => (
          <button
            className={cx("button", "extension", {
              isSelected: hasEffect(atom.extension, effect),
            })}
            key={effect.name}
            onClick={(e) => {
              e.preventDefault();
              changeAtomExtension(effect, atom, false);
            }}
          >
            {effect.name}
          </button>
        ))}
      </div>
      <div className={cx("horizon")}>
        슬라이드:
        {slideEffects.map((effect) => (
          <button
            className={cx("button", "extension", {
              isSelected: hasEffect(atom.extension, effect),
            })}
            key={effect.name}
            onClick={(e) => {
              e.preventDefault();
              changeAtomExtension(effect, atom, true);
            }}
          >
            {effect.name}
          </button>
        ))}
      </div>
      <div className={cx("horizon")}>
        그림자:
        {shadowEffects.map((effect) => (
          <button
            className={cx("button", "extension", {
              isSelected: hasEffect(atom.extension, effect),
            })}
            key={effect.name}
            onClick={(e) => {
              e.preventDefault();
              changeAtomExtension(effect, atom, true);
            }}
          >
            {effect.name}
          </button>
        ))}
      </div>
    </>
  );
};

export const AtomInteractionInput = ({ atom }: TextProps | ImageProps) => {
  const pages = useProject((state) => state.pages);
  const pageStatus = useProject((state) => state.pageStatus);
  const internal = atom.extension.find(
    (ext) => ext.extensionType === "internalLink",
  );
  return (
    <div className={cx("horizon")}>
      페이지 링크:
      <select
        className={cx("select")}
        value={internal ? internal.value : "none"}
        onChange={(e) => {
          if (e.target.value === "none") {
            clearLink(atom, true);
          } else {
            changeAtomExtension(
              { ...clickInteractions[0], value: e.target.value },
              atom,
              true,
            );
          }
        }}
      >
        <option value="none">없음</option>
        {pages
          .filter((page, index) => index !== pageStatus)
          .map((page) => (
            <option key={page.id} value={page.id}>
              {page.pageName}
            </option>
          ))}
      </select>
    </div>
  );
};
