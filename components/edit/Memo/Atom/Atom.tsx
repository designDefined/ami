import styles from "../MemoComponents.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";

import {
  onBlurAtom,
  onChangeInput,
  onClickAtom,
  onKeyDownAtom,
} from "../../handlers/memoEventHandler";
import { useText } from "../../../../store/text";
import { IAtom } from "../../../../types/atom";

interface Props {
  atom: IAtom;
}

const cx = classNames.bind(styles);

export const AtomReader = ({ atom }: Props) => {
  const { markdownType, markdownDepth, content } = atom;
  return (
    <li
      className={cx("Atom", "reader", markdownType, "depth-" + markdownDepth)}
      onClick={onClickAtom(atom)}
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

export const AtomWriter = ({ atom }: Props) => {
  const { type, markdownType } = atom;
  const input = useText((state) => state.input);
  const setInput = useText((state) => state.setInput);

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setInput(atom.content);
  }, [atom]);
  useEffect(() => {
    resizeTextarea(ref.current);
  }, [ref, input]);

  if (type === "image") {
    return <li className={cx("Atom")}>Image</li>;
  }

  return (
    <li className={cx("Atom", "writer", markdownType)}>
      <textarea
        ref={ref}
        className={cx("textArea")}
        placeholder="내용을 입력하세요"
        value={input}
        onBlur={onBlurAtom(atom)}
        onKeyDown={onKeyDownAtom(atom)}
        onChange={onChangeInput(atom)}
        autoFocus
      />
    </li>
  );
};
