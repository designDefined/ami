import styles from "./weaveComponents.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Pages from "./Pages";
import { IPage, IProject } from "../../types/base";

const cx = classNames.bind(styles);

const Weave = ({ name, pages }: { name: string; pages: IPage[] }) => {
  const [weaveStatus, setWeaveStatus] = useState<number>(-1);

  return (
    <div className={cx("Weave")}>
      {pageStatus !== -1 && (
        <div
          className={cx("toPrev")}
          onClick={() => setPageStatus(pageStatus - 1)}
        >
          이전
        </div>
      )}
      {pageStatus !== pages.length - 1 && (
        <div
          className={cx("toNext")}
          onClick={() => setPageStatus(pageStatus + 1)}
        >
          다음
        </div>
      )}
    </div>
  );
};

export default Weave;
