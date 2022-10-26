import styles from "./MemoMarkDown.module.scss";
import { MarkDown } from "../../../../store/base/markDown";
import classNames from "classnames/bind";
import { useSelectedMarkDown } from "../../../../store/selectedMarkdown";
import {
  handleBlurMD,
  handleChangeSelectedInput,
  handleKeyDownMD,
} from "./MarkDownEventHandler";

const cx = classNames.bind(styles);

const MemoMarkDownWriter = () => {
  const source: MarkDown = useSelectedMarkDown((state) => state.source[0]);
  const input: string = useSelectedMarkDown((state) => state.input);

  return (
    <li className={cx("MarkDown", "writer", source.type)}>
      <textarea
        className={cx("textArea")}
        placeholder="내용을 입력하세요"
        value={input}
        onBlur={handleBlurMD(source)}
        onChange={handleChangeSelectedInput}
        onKeyDown={handleKeyDownMD(source, input)}
        autoFocus
      />
    </li>
  );
};

export default MemoMarkDownWriter;
