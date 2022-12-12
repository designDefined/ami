import styles from "./weaveComponents.module.scss";
import classNames from "classnames/bind";
import { IPage, IProject } from "../../types/old/base";
import { useState } from "react";
import { submitPage } from "./WeaveEventHandler";

const cx = classNames.bind(styles);

const Pages = ({ name, pages }: { name: string; pages: IPage[] }) => {
  const [selected, setSelected] = useState<IPage | null>(null);
  const [grabbed, setGrabbed] = useState<{
    source: IPage;
    x: number;
    y: number;
  } | null>(null);
  const [connecting, setConnecting] = useState<IPage | null>(null);
  return (
    <div className={cx("pages-wrapper")}>
      <div
        className={cx("Pages")}
        onMouseMove={(e) => {
          if (grabbed) {
            e.stopPropagation();
            const x = grabbed.x + e.movementX;
            const y = grabbed.y + e.movementY;
            setGrabbed({ ...grabbed, x, y });
          }
        }}
        onClick={() => {
          if (grabbed) {
            submitPage({
              ...grabbed.source,
              graph: {
                ...grabbed.source.graph,
                geometry: {
                  x: grabbed.x,
                  y: grabbed.y,
                },
              },
            });
            setGrabbed(null);
          }
          setSelected(null);
        }}
      >
        {pages
          .filter((page) => page.graph.placed)
          .map((page) =>
            grabbed?.source.id === page.id ? (
              <div
                className={cx("vertex", "grabbed")}
                key={page.id}
                style={{
                  left: grabbed.x,
                  top: grabbed.y,
                  background: page.background,
                }}
                onMouseDown={() => {
                  if (!connecting) {
                    setGrabbed({
                      source: page,
                      x: page.graph.geometry.x,
                      y: page.graph.geometry.y,
                    });
                  }
                }}
                onMouseUp={() => {
                  submitPage({
                    ...grabbed.source,
                    graph: {
                      ...grabbed.source.graph,
                      geometry: {
                        x: grabbed ? grabbed.x : page.graph.geometry.x,
                        y: grabbed ? grabbed.y : page.graph.geometry.y,
                      },
                    },
                  });
                  setSelected(grabbed.source);
                  setConnecting(null);
                  setGrabbed(null);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {page.page_name}
              </div>
            ) : (
              <div
                className={cx("vertex")}
                key={page.id}
                style={{
                  left: page.graph.geometry.x,
                  top: page.graph.geometry.y,
                  background: page.background,
                }}
                onMouseDown={() => {
                  if (!connecting) {
                    setGrabbed({
                      source: page,
                      x: page.graph.geometry.x,
                      y: page.graph.geometry.y,
                    });
                  }
                }}
                onMouseUp={() => {
                  if (grabbed) {
                    setSelected(grabbed.source);
                    setConnecting(null);
                    setGrabbed(null);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selected && connecting) {
                    submitPage({
                      ...selected,
                      graph: {
                        ...selected.graph,
                        to: [...selected.graph.to, connecting.id],
                      },
                    });
                  }
                }}
              >
                {page.page_name}
              </div>
            ),
          )}
      </div>
      <div className={cx("side")}>
        {selected ? (
          <div className={cx("info")}>
            <div>이름: {selected.page_name}</div>
            <div>내용: {selected.atoms[0].content}</div>
            <div>연결: {selected.graph.to.join(" ")}</div>
            <button
              className={cx("connect", { on: connecting })}
              onClick={() => {
                if (selected && !connecting) {
                  setConnecting(selected);
                } else {
                  setConnecting(null);
                }
              }}
            >
              연결
            </button>
          </div>
        ) : (
          <div className={cx("info")}>제목: {name}</div>
        )}
        {pages.map((page) => (
          <div
            className={cx("pageItem", { selected: selected?.id === page.id })}
            key={page.id}
            onClick={() => {
              if (page.graph.placed) {
                setSelected(page);
              } else {
                submitPage({
                  ...page,
                  graph: {
                    ...page.graph,
                    placed: true,
                    geometry: { x: 500, y: 300 },
                  },
                });
                setSelected(page);
              }
            }}
          >
            <div>이름: {page.page_name}</div>
            <div>내용: {page.atoms[0].content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Pages;
