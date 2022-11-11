import styles from "./weaveComponents.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Pages from "./Pages";
import { IPage, IProject } from "../../../types/base";
import Saver from "../Saver/Saver";
import Page from "./Page";

const cx = classNames.bind(styles);

const Weave = ({ name, pages }: { name: string; pages: IPage[] }) => {
  const [pageStatus, setPageStatus] = useState<number>(-1);

  return (
    <div className={cx("Weave")}>
      <Saver />
      {pageStatus === -1 ? (
        <Pages pages={pages} name={name} />
      ) : (
        <Page page={pages[pageStatus]} />
      )}
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
