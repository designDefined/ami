import styles from "./EdgeMarkDown.module.scss";
import classNames from "classnames/bind";
import useInputValueStore from "../../../store/inputValue";
import { EdgeMarkDown, EdgeMarkDownType } from "../../../store/base/markDown";
import { useCallback } from "react";

interface MarkDownWriterProps {
  source: EdgeMarkDown;
  setter: (type: EdgeMarkDownType, input: string) => void;
}

const cx = classNames.bind(styles);

const MarkDownWriter = ({ source, setter }: MarkDownWriterProps) => {
  const type = useInputValueStore((state) => state.type);
  const currentValue = useInputValueStore((state) => state.currentValue);
  const setValue = useInputValueStore((state) => state.updateValue);

  const onChangeInputValue: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    setValue(e.target.value);
  };
  const onKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    switch (e.key) {
      case "Enter":
        setter(type, currentValue);
        e.preventDefault();
        break;
    }
  };

  return (
    <textarea
      className={cx("MarkDown", "writer")}
      placeholder="내용을 입력하세요"
      value={currentValue}
      onChange={onChangeInputValue}
      onKeyPress={onKeyPress}
      autoFocus
    />
  );
};

export default MarkDownWriter;
