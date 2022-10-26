import styles from "./project.module.scss";
import { NextPage } from "next";
import { useProjectStore } from "../../store/project";
import EdgeList from "../../components/project/EdgeMemo/EdgeList";
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
      {status === "memo" && <EdgeList />}
    </article>
  );
};

export default Project;
