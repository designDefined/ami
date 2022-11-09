import styles from "./ReadComponents.module.scss";
import classNames from "classnames/bind";
import { IPage } from "../../../types/base";
import Atom from "./Atom";
import Navigator from "./Navigator";
import { useState } from "react";

interface Props {
  pages: IPage[];
}

const cx = classNames.bind(styles);

const Read = ({ pages }: Props) => {
  const [pageNum, setPageNum] = useState<number>(0);

  return (
    <div className={cx("wrapper")}>
      <section className={cx("Read")}>
        <div className={cx("Page")}>
          {pages[pageNum].atoms.map((atom) => (
            <Atom key={atom.id} atom={atom} />
          ))}
          \
        </div>
        {pageNum !== 0 && (
          <div className={cx("toPrev")} onClick={() => setPageNum(pageNum - 1)}>
            이전
          </div>
        )}
        {pageNum !== pages.length - 1 && (
          <div className={cx("toNext")} onClick={() => setPageNum(pageNum + 1)}>
            다음
          </div>
        )}
      </section>
    </div>
  );
};

export default Read;
