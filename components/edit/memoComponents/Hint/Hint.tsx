import { useState } from "react";
import styles from "./Hint.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Hint = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={cx("Hint")}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      {open && (
        <div className={cx("content")}>
          <p>에디터에서 아래와 같은 기능을 사용할 수 있습니다.</p>
          <p>(개발 중인 기능은 취소선으로 표시됩니다)</p>
          <br />
          <p className={cx("italic")}>블럭 첫머리에</p>
          <p>
            <b># ~ ####</b> : 제목 강조
          </p>
          <p className={cx("notYet")}>
            <b>- 또는 *</b> : 순서 없는 리스트
          </p>
          <p className={cx("notYet")}>
            <b>1. 2. 3... </b> : 순서 있는 리스트
          </p>
        </div>
      )}
      <div
        className={cx("button", { open })}
        onMouseEnter={() => {
          setOpen(true);
        }}
      >
        도움말
      </div>
    </div>
  );
};

export default Hint;
