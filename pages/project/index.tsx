import styles from "./project.module.scss";
import { NextPage } from "next";
import { useProjectStore } from "../../store/project";
import EdgeList from "../../components/project/EdgeMemo/EdgeList";
import classNames from "classnames/bind";
import Header from "../../components/project/Header/Header";
import { useEffect } from "react";
import SaveLoader from "../../components/project/SaveLoader/SaveLoader";
import { loadProject } from "../../api/filesystem";
import { useRouter } from "next/router";
import Hint from "../../components/project/Hint/Hint";

const cx = classNames.bind(styles);

const Project: NextPage = () => {
  const title = useProjectStore((state) => state.title);
  const status = useProjectStore((state) => state.status);
  const router = useRouter();
  useEffect(() => {
    // loadProject();
  });

  return (
    <article className={cx("Project")}>
      <Header title={title} />
      <SaveLoader />
      <EdgeList />
      <button
        className={cx("toHome")}
        onClick={() => {
          router.push("/temporal");
        }}
      >
        {"< 홈으로 돌아가기"}
      </button>
      <Hint />
      {/*status === "memo" && <EdgeList />*/}
    </article>
  );
};

export default Project;
