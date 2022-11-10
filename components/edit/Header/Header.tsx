import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { IEditStatus } from "../../../types/status";
import { useCallback } from "react";
const cx = classNames.bind(styles);

interface Props {
  name: string;
  status: IEditStatus;
  setStatus: (status: IEditStatus) => void;
}

const Header = ({ name, status, setStatus }: Props) => {
  const handleStatusButton =
    (target: IEditStatus): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      if (status !== target) {
        setStatus(target);
      }
    };

  return (
    <header className={cx("Header")}>
      {name}
      <div className={cx("modes")}>
        <button
          className={cx({ selected: status === "memo" })}
          onClick={handleStatusButton("memo")}
        >
          메모
        </button>
        <button
          className={cx({ selected: status === "weave" })}
          onClick={handleStatusButton("weave")}
        >
          편집
        </button>
        <button
          className={cx({ selected: status === "preview" })}
          onClick={handleStatusButton("preview")}
        >
          프리뷰
        </button>
        <button>배포</button>
      </div>
    </header>
  );
};
export default Header;
