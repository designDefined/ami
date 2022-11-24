import styles from "./Bubble.module.scss";
import { NextPage } from "next";
import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import {
  IBubble,
  IMemory,
  IStage,
  rawStage,
  load,
  save,
  rawBubble,
  clear,
  checkStage,
} from "../../components/bubble";
import _ from "lodash";
import { Simulate } from "react-dom/test-utils";

const cx = classNames.bind(styles);

const Bubble: NextPage = () => {
  const [stage, setStage] = useState<IStage>(rawStage[0]);
  const [data, setData] = useState<IBubble[]>([]);
  const [view, setView] = useState<null | IBubble>(null);
  const [reload, setReload] = useState<boolean>(true);

  useEffect(() => {
    //load
    if (reload) {
      const memory = load();
      if (memory) {
        setStage(memory.stage);
        setData(
          rawBubble.map((bubble) =>
            memory.readBubbles.includes(bubble.id)
              ? { ...bubble, read: true }
              : bubble,
          ),
        );
      } else {
        setStage(rawStage[0]);
        setData(rawBubble);
      }
      setView(null);
    }
    setReload(false);
  }, [reload]);

  if (!view) {
    if (stage.id === 0) {
      return <div>init</div>;
    } else {
      return (
        <article className={cx("Map", `stage${stage.id}`)}>
          <div className={cx("thumbs")}>
            {data
              .filter(
                (bubble) =>
                  bubble.id >= stage.bubbleStart && bubble.id < stage.bubbleEnd,
              )
              .map((bubble) => (
                <div
                  key={bubble.id}
                  className={cx("BubbleThumb", `spheres-${bubble.id % 4}`, {
                    read: bubble.read,
                    big: bubble.big,
                  })}
                  style={{
                    transform: `translate(${bubble.x}px, ${bubble.y}px)`,
                  }}
                  onClick={() => {
                    setView(bubble);
                  }}
                >
                  <div className={cx("sphere", "s0")} />
                  <div className={cx("sphere", "s1")} />
                  <div className={cx("sphere", "s2")} />
                  <div className={cx("sphere", "s3")} />
                  <div className={cx("label")}>{bubble.name}</div>
                </div>
              ))}
          </div>
          <button
            onClick={() => {
              clear();
              setReload(true);
            }}
          >
            clear
          </button>
        </article>
      );
    }
  } else {
    const { id, name, content } = view;
    return (
      <article className={cx("Bubble", `id${id}`)}>
        <div className={cx("container")}>
          <div className={cx("title")}> {name}</div>
          <div className={cx("contents")}>
            {content.map((text) => (
              <p className={cx("content")}>{text}</p>
            ))}
          </div>
          <button
            className={cx("goBack")}
            onClick={() => {
              const newData: IBubble[] = data.map((bubble) =>
                bubble.id === view.id ? { ...bubble, read: true } : bubble,
              );
              const newReadBubbles = newData
                .filter((bubble) => bubble.read)
                .map((bubble) => bubble.id);
              const newStage = checkStage(newReadBubbles, stage);
              const newMemory: IMemory = {
                stage: newStage,
                readBubbles: newReadBubbles,
              };
              save(newMemory);
              setData(newData);
              setStage(newStage);
              setReload(true);
            }}
          >
            돌아가기
          </button>
        </div>
        {/*<div className={cx("hider")} />*/}
      </article>
    );
  }
};

export default Bubble;
