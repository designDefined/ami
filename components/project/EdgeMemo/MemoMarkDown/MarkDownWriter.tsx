import styles from "./MemoMarkDown.module.scss";
import { MarkDown } from "../../../../nouse/base/markDown";
import classNames from "classnames/bind";
import { useSelectedMarkDown } from "../../../../nouse/selectedMarkdown";
import {
  handleBlurMD,
  handleChangeSelectedInput,
  handleKeyDownMD,
} from "./MarkDownEventHandler";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

const resizeTextarea = (ref: HTMLTextAreaElement | null): void => {
  console.log("abc");
  if (ref) {
    console.dir(ref.scrollHeight);
    ref.style.height = ref.scrollHeight + "px";
  }
};

const MemoMarkDownWriter = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const source: MarkDown = useSelectedMarkDown((state) => state.source[0]);
  const input: string = useSelectedMarkDown((state) => state.input);

  useEffect(() => {
    resizeTextarea(ref.current);
  }, [input]);

  return (
    <li className={cx("MarkDown", "writer", source.type)}>
      <textarea
        ref={ref}
        className={cx("textArea")}
        placeholder="내용을 입력하세요"
        value={input}
        onBlur={handleBlurMD(source)}
        onKeyDown={handleKeyDownMD(source, input)}
        onChange={handleChangeSelectedInput}
        autoFocus
      />
    </li>
  );
};

export default MemoMarkDownWriter;
