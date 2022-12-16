import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useProject } from "../../../store/project";
import localStorageAPI from "../../../API/local/localStorageAPI";
import { toast } from "react-toastify";
import Header from "../../../components/edit/Header/Header";
import Memo from "../../../components/edit/memoComponents/Memo";
import styles from "./Edit.module.scss";
import classNames from "classnames/bind";
import Saver from "../../../components/edit/Saver/Saver";
import Weave from "../../../components/edit/Weave/Weave";

const cx = classNames.bind(styles);

const Edit: NextPage = () => {
  const router = useRouter();
  const loadStatus = useProject((state) => state.loadStatus);
  const load = useProject((state) => state.load);
  const id = useProject((state) => state.id);
  const editStatus = useProject((state) => state.editStatus);
  const clear = useProject((state) => state.clear);

  //load project logic
  useEffect(() => {
    if (router.query.project_id) {
      const routerId = Number(router.query.project_id);
      if (loadStatus !== "success" || routerId !== id) {
        localStorageAPI
          .getProjectById(Number(router.query.project_id))
          .then(({ status, data }) => {
            if (status === "localAPISuccess") {
              toast.success("Project Loaded");
              load(data);
            } else {
              toast.error(`Project load failed with reason: ${data}`);
            }
          });
      }
    }
  }, [router.query.project_id]);

  return (
    <article
      className={cx("Project", {
        memo: editStatus === "memo",
        weave: editStatus === "weave",
      })}
    >
      {loadStatus === "success" && (
        <>
          <Header />
          {editStatus === "memo" && <Memo />}
          {/*{editStatus === "preview" && <ReadByPage />}*/}
          {editStatus === "weave" && <Weave />}
          <Saver />
        </>
      )}
      {loadStatus === "loading" && <div>loading</div>}
      {loadStatus === "fail" && <div>failed</div>}
    </article>
  );
};

export default Edit;
