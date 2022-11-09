import styles from "./Edit.module.scss";
import { NextPage } from "next";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProject, useProjectStore } from "../../store/api/project";
import Header from "../../components/edit/Header/Header";
import Saver from "../../components/edit/Saver/Saver";
import Memo from "../../components/edit/memoComponents/Memo";
import createEmpty from "../../types/empty";
import Hint from "../../components/edit/Hint/Hint";
import Read from "../../components/edit/readComponents/Read";

const cx = classNames.bind(styles);

const Edit: NextPage = () => {
  const router = useRouter();
  const name = useProjectStore((state) => state.project_name);
  const writer = useProjectStore((state) => state.writer);
  const pages = useProjectStore((state) => state.pages);
  const setProjectTitle = useProjectStore((state) => state.setProjectTitle);
  const [status, setStatus] = useState<string>("read");
  useEffect(() => {
    if (router.query.project_id) {
      getProject(Number(router.query.project_id));
    }
  }, [router.query]);

  return (
    <article className={cx("Project")}>
      <Header name={name} />
      {status === "read" && <Read pages={pages} />}
      {status === "memo" && <Memo pages={pages} />}
      <button
        className={cx("toHome")}
        onClick={() => {
          router.push("/");
        }}
      >
        {"< 홈으로 돌아가기"}
      </button>
    </article>
  );
};

export default Edit;
