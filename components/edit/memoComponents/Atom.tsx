import { IAtom } from "../../../types/base";
import styles from "./MemoComponents.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { useSelectedAtomStore } from "../../../store/api/selectedAtom";

import {
  handleBlurAtom,
  handleChangeSelectedInput,
  handleClickAtom,
  handleKeyDownAtom,
} from "../handlers/memoEventHandler";
import { type } from "os";
import { useAtom } from "../../../store/atom";

const cx = classNames.bind(styles);

export const AtomReader = ({ atom }: { atom: IAtom }) => {
  const { markdownType, markdownDepth, content } = atom;
  return (
    <li
      className={cx("Atom", "reader", markdownType, "depth-" + markdownDepth)}
      // onClick={handleClickAtom(atom)}
    >
      {content}
    </li>
  );
};

const resizeTextarea = (ref: HTMLTextAreaElement | null): void => {
  if (ref) {
    ref.style.height = ref.scrollHeight + "px";
  }
};

export const AtomWriter = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const id = useAtom((state) => state.id);
  const markdownType = useAtom((state) => state.markdownType);
  const content = useAtom((state) => state.content);

  useEffect(() => {
    resizeTextarea(ref.current);
  });

  return (
    <li className={cx("Atom", "writer", markdownType)}>
      <textarea
        ref={ref}
        className={cx("textArea")}
        placeholder="내용을 입력하세요"
        value={content}
        // onBlur={handleBlurAtom(atom)}
        onKeyDown={handleKeyDownAtom}
        // onChange={handleChangeSelectedInput}
        autoFocus
      />
    </li>
  );
};
