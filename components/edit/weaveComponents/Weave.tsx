import styles from "./weaveComponents.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Pages from "./Pages";
import { IPage, IProject } from "../../../types/base";
import Saver from "../Saver/Saver";

const cx = classNames.bind(styles);

const Weave = ({ name, pages }: { name: string; pages: IPage[] }) => {
  const [pageStatus, setPageStatus] = useState<number>(-1);

  return (
    <div className={cx("Weave")}>
      <Saver />
      {pageStatus === -1 ? <Pages pages={pages} name={name} /> : <div />}
    </div>
  );
};

export default Weave;
