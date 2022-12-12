import styles from "./weaveComponents.module.scss";
import classNames from "classnames/bind";
import { IAtom, IPage, IProject } from "../../types/old/base";
import { useState } from "react";
import { submitAtom, submitPage } from "./WeaveEventHandler";
import AtomForm from "./AtomForm";

const cx = classNames.bind(styles);

const Atom = ({ atom, selected }: { atom: IAtom; selected: boolean }) => {
  const { type, markdown, style } = atom;
  const { geometry } = style;
  const { x, y, width } = style.geometry;
  if (type === "text") {
    return (
      <div
        className={cx("atom", `${markdown.type}`)}
        style={{ left: x, top: y, width: width }}
      >
        {atom.content}
      </div>
    );
  } else {
    return <div>이미지</div>;
  }
};

const Pages = ({ page }: { page: IPage }) => {
  const [selected, setSelected] = useState<IAtom | null>(null);
  const { atoms } = page;
  const [grabbed, setGrabbed] = useState<{
    source: IAtom;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className={cx("Page")}>
      <div
        className={cx("atoms")}
        onMouseMove={(e) => {
          if (grabbed) {
            e.stopPropagation();
            const x = grabbed.x + e.movementX;
            const y = grabbed.y + e.movementY;
            setGrabbed({ ...grabbed, x, y });
          }
        }}
        onClick={() => {
          setSelected(null);
        }}
      >
        {atoms
          .filter((atom) => atom.style.placed)
          .map((atom) => {
            const { type, markdown, style, id } = atom;
            const { geometry } = style;
            const { x, y, width } = style.geometry;
            if (type === "text") {
              const style =
                grabbed?.source.id === id
                  ? { left: grabbed.x, top: grabbed.y, width }
                  : { left: x, top: y, width };

              return (
                <div
                  key={atom.id}
                  className={cx(
                    "atom",
                    { selected: selected?.id === atom.id },
                    `${markdown.type}`,
                  )}
                  style={style}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setGrabbed({
                      source: atom,
                      x: atom.style.geometry.x,
                      y: atom.style.geometry.y,
                    });
                  }}
                  onMouseUp={() => {
                    if (grabbed?.source.id === id) {
                      submitAtom({
                        ...grabbed.source,
                        style: {
                          ...grabbed.source.style,
                          geometry: {
                            ...grabbed.source.style.geometry,
                            x: grabbed ? grabbed.x : atom.style.geometry.x,
                            y: grabbed ? grabbed.y : atom.style.geometry.y,
                          },
                        },
                      });
                      setSelected(grabbed.source);
                      setGrabbed(null);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {atom.content}
                </div>
              );
            } else {
              return <div>이미지</div>;
            }
          })}
      </div>
      <div className={cx("side")}>
        <div className={cx("info")}>
          <div>페이지 이름: {page.page_name}</div>
        </div>
        {atoms
          .filter((atom) => atom.content.length >= 1)
          .map((atom) => (
            <div
              className={cx("atomItem", { selected: selected?.id === atom.id })}
              key={atom.id}
              onClick={() => {
                if (atom.style.placed) {
                  setSelected(atom);
                  console.log("pl");
                } else {
                  submitAtom({
                    ...atom,
                    style: {
                      placed: true,
                      geometry: { x: 300, y: 200, width: 1000 },
                      color: "#000000",
                      interaction: [],
                    },
                  });
                }
                setSelected(atom);
              }}
            >
              {atom.content}
              <AtomForm atom={atom} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Pages;
