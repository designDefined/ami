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
} from "../handlers/AtomEventHandler";

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
  const atom: IAtom = useSelectedAtomStore((state) => state.source[0]);
  const input: string = useSelectedAtomStore((state) => state.input);

  useEffect(() => {
    resizeTextarea(ref.current);
  });

  return (
    <li className={cx("Atom", "writer", type)}>
      <textarea
        ref={ref}
        className={cx("textArea")}
        placeholder="내용을 입력하세요"
        value={input}
        // onBlur={handleBlurAtom(atom)}
        // onKeyDown={handleKeyDownAtom(atom, input)}
        // onChange={handleChangeSelectedInput}
        autoFocus
      />
    </li>
  );
};
