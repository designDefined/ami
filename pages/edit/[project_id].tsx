import styles from "./Edit.module.scss";
import { NextPage } from "next";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProject, useProjectStore } from "../../store/api/project";
import Header from "../../components/edit/Header/Header";
import Saver from "../../components/edit/Saver/Saver";
import Memo from "../../components/edit/memoComponents/Memo";
import createEmpty from "../../data/createEmpty";
import Hint from "../../components/edit/Hint/Hint";
import Read from "../../components/edit/readComponents/Read";
import ReadByPage from "../../components/edit/readComponents/ReadByPage";
import { IEditStatus } from "../../types/status";
import Weave from "../../components/edit/weaveComponents/Weave";

const cx = classNames.bind(styles);

const Edit: NextPage = () => {
  const router = useRouter();
  const name = useProjectStore((state) => state.project_name);
  const pages = useProjectStore((state) => state.pages);
  const setProjectTitle = useProjectStore((state) => state.setProjectTitle);
  const [status, setStatus] = useState<IEditStatus>("memo");
  useEffect(() => {
    if (router.query.project_id) {
      getProject(Number(router.query.project_id)).then((result) => {
        if (!result) {
          router.push("/");
        }
      });
    }
  }, [router.query]);

  return (
    <article className={cx("Project", { weave: status === "weave" })}>
      <Header name={name} status={status} setStatus={setStatus} />
      {status === "preview" && <ReadByPage pages={pages} />}
      {status === "memo" && <Memo pages={pages} />}
      {status === "weave" && <Weave name={name} pages={pages} />}
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
