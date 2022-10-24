import styles from "./project.module.scss";
import { NextPage } from "next";
import { useProjectStore } from "../../store/project";
import MemoPad from "../../components/project/MemoPad/MemoPad";
import classNames from "classnames/bind";
import Header from "../../components/project/Header/Header";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const Project: NextPage = () => {
  const title = useProjectStore((state) => state.title);
  const status = useProjectStore((state) => state.status);

  useEffect(() => {}, []);

  return (
    <article className={cx("Project")}>
      <Header title={title} />
      {status === "memo" && <MemoPad />}
    </article>
  );
};

export default Project;
